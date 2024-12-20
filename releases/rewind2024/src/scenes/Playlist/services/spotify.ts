import { blobToBase64 } from '@rewind/core/src/utils/canvas'
import { TopTracks, TrackWithResource } from '@rewind/resolver/src/types'
import { TFunction } from 'i18next'
import { authCallbackUrl, PlaylistData, PlaylistUser } from '../common'

const clientId = import.meta.env.VITE_SPOTIFY_ID as string

export function launchSpotifyLogin() {
  const params = new URLSearchParams({
    response_type: 'token',
    client_id: clientId,
    scope: 'ugc-image-upload user-read-private playlist-modify-public',
    redirect_uri: authCallbackUrl,
    state: 'spotify'
    // show_dialog: 'true'
  })

  const url = 'https://accounts.spotify.com/authorize?' + params.toString()

  window.open(url, 'popup', 'width=500, height=800')
}

function request(
  endpoint: string,
  token: string,
  options?: Partial<RequestInit>
) {
  return fetch('https://api.spotify.com/v1/' + endpoint, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    ...options
  })
}

export async function getSpotifyUser(token: string): Promise<PlaylistUser> {
  const user = await request('me', token).then((r) => r.json())

  return {
    id: user.id,
    name: user.display_name,
    image: user.images?.[0]?.url,
    service: 'spotify',
    token
  }
}

interface SpotifyPlaylist {
  external_urls: {
    spotify: string
  }
  id: string
  name: string
}

async function createPlaylist(
  userId: string,
  name: string,
  description: string,
  token: string
) {
  const r = await request(`users/${userId}/playlists`, token, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description
    })
  })
  return await (r.json() as Promise<SpotifyPlaylist | null>)
}

export async function createSpotifyPlaylist(
  token: string,
  name: string,
  description: string,
  tracks: TopTracks['resources'],
  imageUrl: string
): Promise<PlaylistData> {
  const user = await getSpotifyUser(token)

  const playlist = await createPlaylist(user.id, name, description, token)

  if (!playlist || !playlist.id) {
    throw new Error('Could not create playlist on Spotify')
  }

  let ids = tracks
    .slice(0, 100)
    .map((t) => t.spotify_id)
    .filter((id) => !!id) as string[]

  // remove duplicates
  ids = Array.from(new Set(ids))

  await request(`playlists/${playlist.id}/tracks`, token, {
    method: 'POST',
    body: JSON.stringify({
      uris: ids.map((id) => `spotify:track:${id}`)
    })
  })

  const image = await fetch(imageUrl)

  const base64 = await blobToBase64(await image.blob())

  await request(`playlists/${playlist.id}/images`, token, {
    method: 'PUT',
    headers: {
      'content-type': image.headers.get('content-type') || 'image/jpeg',
      authorization: `Bearer ${token}`
    },
    body: base64.replace(/data:image\/(jpeg|png);base64,/g, '')
  })

  const missingTracks = tracks
    .slice(0, 100)
    .filter((t) => !t.spotify_id)
    .map((t) => t.name)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user,
        service: 'spotify',
        id: playlist.id,
        missingTracks
      })
    }, 500)
  })
}
