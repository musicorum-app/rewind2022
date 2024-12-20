import { TopTracks } from '@rewind/resolver/src/types'
import fetchJsonp from 'fetch-jsonp'
import { authCallbackUrl, PlaylistData, PlaylistUser } from '../common'

const clientId = import.meta.env.VITE_DEEZER_ID as string

export function launchDeezerLogin() {
  const params = new URLSearchParams({
    response_type: 'token',
    app_id: clientId,
    perms: 'manage_library,basic_access',
    redirect_uri: authCallbackUrl + '?state=deezer',
    state: 'deezer'
  })

  window.open(
    'https://connect.deezer.com/oauth/auth.php?' + params.toString(),
    'popup',
    'width=800, height=360'
  )
}

function request(endpoint: string, token: string, params = {}) {
  const query = new URLSearchParams(params)
  query.append('output', 'jsonp')
  query.append('access_token', token)

  return fetchJsonp(
    `https://api.deezer.com/${endpoint}?${query.toString()}`
  ).then((r) => r.json())
}

async function getUser(token: string): Promise<PlaylistUser> {
  const user = await request('user/me', token)

  return {
    id: user.id,
    name: user.firstname,
    image: user.picture_medium,
    service: 'deezer',
    token
  }
}

async function uploadPlaylistImage(
  id: number,
  token: string,
  image: Blob
): Promise<void> {
  const { upload_token } = await request('infos', token)

  const form = new FormData()
  form.append('file', image, 'cover.jpg')

  const params = `access_token=${token}&upload_token=${upload_token}`

  const response = fetch(`https://upload.deezer.com/playlist/${id}?${params}`, {
    method: 'POST',
    body: form
  }).then((r) => r.json())
  console.log(response)
}

export async function createDeezerPlaylist(
  token: string,
  name: string,
  description: string,
  tracks: TopTracks['resources'],
  imageUrl: string
): Promise<PlaylistData> {
  const user = await getUser(token)

  const playlist = await request('user/me/playlists', token, {
    request_method: 'POST',
    title: name,
    description
  })

  let ids = tracks
    .slice(0, 100)
    .map((t) => t.deezer_id)
    .filter((id) => !!id) as number[]

  // remove duplicates
  ids = Array.from(new Set(ids))

  await request(`playlist/${playlist.id}/tracks`, token, {
    request_method: 'POST',
    songs: ids.join(',')
  })

  const image = await fetch(imageUrl)

  await uploadPlaylistImage(playlist.id, token, await image.blob())

  const missingTracks = tracks
    .slice(0, 100)
    .filter((t) => !t.deezer_id)
    .map((t) => t.name)

  return {
    user,
    service: 'deezer',
    id: playlist.id,
    missingTracks
  }
}
