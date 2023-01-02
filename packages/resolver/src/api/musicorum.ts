import { ArtistResource, TrackResource } from './types'

type ResourceType = 'artists' | 'tracks' | 'albums'

function request<R = unknown>(
  path: string,
  params: Record<string, string>,
  body: unknown
) {
  const query = new URLSearchParams(params)
  return fetch(`https://api-v2.musicorumapp.com${path}?${query.toString()}`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((r) => r.json() as unknown as R)
    .catch((err) => {
      console.error('musicorum resources error', err)
      return []
    })
}

export function getArtistsResources(artists: string[]) {
  return request<(ArtistResource | null)[]>(
    '/v2/resources/artists',
    {
      popularity: 'true',
      sources: 'spotify,deezer',
      api_key: import.meta.env.VITE_MUSICORUM_KEY
    },
    {
      artists
    }
  )
}

export function getTracksResources(
  tracks: { name: string; album?: string; artist?: string }[]
) {
  return request<(TrackResource | null)[]>(
    '/v2/resources/tracks',
    {
      preview: 'true',
      sources: 'spotify,deezer,lastfm',
      api_key: import.meta.env.VITE_MUSICORUM_KEY
    },
    {
      tracks
    }
  )
}

export function generateRewindGrid(
  tiles: { name: string; image: string | null }[]
) {
  return request<{ url?: string }>(
    '/collages/generate-rewind',
    {
      api_key: import.meta.env.VITE_MUSICORUM_KEY
    },
    {
      tiles
    }
  )
}
