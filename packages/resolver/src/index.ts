import {
  LastfmRecentTracksTrack,
  LastfmUserInfo
} from '@musicorum/lastfm/dist/types/packages/user'
import LastClient from '@musicorum/lastfm'
import { getTopAlbums, getTopArtists, getTopTracks } from './finders/tops'

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
  stepNumber?: number
  maxSteps?: number
}

export async function resolveRewindData(
  user: LastfmUserInfo,
  lastClient: LastClient,
  statusCallback: (status: StatusUpdatePayload) => void
) {
  statusCallback({
    step: ResolveStep.STARTUP
  })
  let recentTracks: LastfmRecentTracksTrack[] = []
  const cache = await caches.match('/scrobbles_cache.json')

  if (import.meta.env.DEV && cache) {
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
        stepNumber: i,
        maxSteps: pagination.totalPages
      })
      await pagination.fetchPage(i)
    }

    recentTracks = pagination.getAll()
    if (import.meta.env.DEV) {
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

  // @ts-expect-error vtnc
  window.recentTracks = recentTracks

  const topTracks = getTopTracks(recentTracks)
  const topArtists = getTopArtists(recentTracks)
  const topAlbums = getTopAlbums(recentTracks)

  // @ts-expect-error vtnc
  window.tops = [topTracks, topArtists, topAlbums]

  console.log(recentTracks)
  console.log(topTracks)
}
