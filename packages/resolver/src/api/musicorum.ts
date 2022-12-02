import { ArtistResource, TrackResource } from './types'

type ResourceType = 'artists' | 'tracks' | 'albums'

function request<R = unknown>(
  type: ResourceType,
  params: Record<string, string>,
  body: unknown
) {
  const query = new URLSearchParams(params)
  return fetch(
    `https://api-v2.musicorumapp.com/v2/resources/${type}?${query.toString()}`,
    {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  ).then((r) => r.json() as unknown as R[])
}

export function getArtistsResources(artists: string[]) {
  return request<ArtistResource | null>(
    'artists',
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
  return request<TrackResource | null>(
    'tracks',
    {
      preview: 'true',
      sources: 'spotify,deezer',
      api_key: import.meta.env.VITE_MUSICORUM_KEY
    },
    {
      tracks
    }
  )
}
