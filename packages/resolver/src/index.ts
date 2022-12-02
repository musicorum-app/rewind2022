import {
  LastfmRecentTracksTrack,
  LastfmUserInfo
} from '@musicorum/lastfm/dist/types/packages/user'
import LastClient from '@musicorum/lastfm'
import {
  getTopAlbums,
  getTopArtists,
  getTopTracks,
  parseTopTracks
} from './finders/tops'
import { RewindData, Track } from './types'
import { formatTrack } from './modules/image'
import { parseScrobbles } from './finders/scrobbles'
import parseFirstScrobbles from './finders/firstScrobbles'

const from = new Date('2022-01-01 00:00')
const to = new Date('2022-12-31 23:59')

export enum ResolveStep {
  STARTUP,
  FETCHING_PAGES,
  FETCHING_RESOURCES,
  FINALIZING
}

export interface StatusUpdatePayload {
  step: ResolveStep
  value?: number
  maxValue?: number
}

export async function resolveRewindData(
  user: LastfmUserInfo,
  lastClient: LastClient,
  statusCallback: (status: StatusUpdatePayload) => void
): Promise<RewindData> {
  statusCallback({
    step: ResolveStep.STARTUP
  })
  let recentTracks: Track[] = []
  const cache = await caches.match('/scrobbles_cache.json')

  if (cache) {
    recentTracks = await cache.json()
  }

  if (!recentTracks.length) {
    const pagination = await lastClient.user.getRecentTracksPaginated(
      user.name,
      {
        from,
        to,
        extended: true,
        limit: 1000
      }
    )

    for (let i = 2; i < pagination.totalPages + 1; i++) {
      statusCallback({
        step: ResolveStep.FETCHING_PAGES,
        value: pagination.getAll().length,
        maxValue: pagination.totalResults
      })
      await pagination.fetchPage(i)
    }

    recentTracks = pagination.getAll().map((t) => formatTrack(t))
    if (Date.now() > 2 && caches.open) {
      const storage = await caches.open('ScrobblesCache')

      const response = new Response(JSON.stringify(recentTracks), {
        headers: {
          'content-type': 'application/json'
        }
      })

      await storage.put('/scrobbles_cache.json', response)
    }
  }

  const lastYear = await lastClient.user.getRecentTracks(user.name, {
    from: new Date('2021-01-01 00:00'),
    to: new Date('2021-12-31 23:59'),
    limit: 2
  })

  statusCallback({
    step: ResolveStep.FETCHING_RESOURCES
  })

  console.log(recentTracks)

  const topTracks = getTopTracks(recentTracks)
  const topArtists = await getTopArtists(recentTracks)
  const topAlbums = getTopAlbums(recentTracks)

  console.log(recentTracks)
  console.log(topTracks)

  const data: RewindData = {
    user: user.name,
    firstScrobbles: await parseFirstScrobbles(recentTracks, topTracks),
    scrobbles: parseScrobbles(recentTracks, lastYear),
    artists: topArtists,
    tracks: await parseTopTracks(topTracks),
    albums: getTopAlbums(recentTracks)
  }

  if (import.meta.env.DEV) {
    // @ts-expect-error force global var
    window.rewindData = data
  }

  return data
}

export function clearRewindDataCache() {
  console.debug('Cleared rewind cache')
  return caches.delete('ScrobblesCache')
}
