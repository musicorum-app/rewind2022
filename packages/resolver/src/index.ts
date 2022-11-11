import {
  LastfmRecentTracksTrack,
  LastfmUserInfo
} from '@musicorum/lastfm/dist/types/packages/user'
import LastClient from '@musicorum/lastfm'
import { getTopAlbums, getTopArtists, getTopTracks } from './finders/tops'
import { RewindData, Track } from './types'
import { removeDefaultTrackImage } from './modules/image'

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

    recentTracks = pagination.getAll().map((t) => removeDefaultTrackImage(t))
    if (Date.now() > 2) {
      const storage = await caches.open('ScrobblesCache')

      const response = new Response(JSON.stringify(recentTracks), {
        headers: {
          'content-type': 'application/json'
        }
      })

      await storage.put('/scrobbles_cache.json', response)
    }
  }

  statusCallback({
    step: ResolveStep.FETCHING_RESOURCES
  })

  const topTracks = getTopTracks(recentTracks)
  const topArtists = getTopArtists(recentTracks)
  const topAlbums = getTopAlbums(recentTracks)

  console.log(recentTracks)
  console.log(topTracks)

  const firstScrobblesList = [...recentTracks].reverse()

  const firstScrobbles = [] as Track[]
  for (let i = 0; i < firstScrobblesList.length; i++) {
    const track = firstScrobblesList[i]
    console.log(track.url)
    if (firstScrobbles.length >= 5) {
      break
    } else if (
      // make sure to include first scrobble
      i === 0 ||
      !firstScrobbles.find((t) => t.album.name === track.album.name)
    ) {
      console.log(i)
      firstScrobbles.push(track)
    }
  }

  const firstScrobblesOnTracks = topTracks.find((tracks) =>
    tracks.find(
      (t) => t.date!.toString() === firstScrobbles[0].date!.toString()
    )
  )

  if (!firstScrobblesOnTracks) {
    throw new Error('Could not find first scrobbles count through the year')
  }

  const data: RewindData = {
    firstScrobbles: {
      items: firstScrobbles,
      firstScrobbleTrackCount: firstScrobblesOnTracks.length
    }
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
