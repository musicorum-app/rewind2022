import { TopTracks } from '@rewind/resolver/src/types'
import { TFunction } from 'i18next'
import { createDeezerPlaylist } from './services/deezer'
import { createSpotifyPlaylist, getSpotifyUser } from './services/spotify'

type Service = 'spotify' | 'deezer'

export interface CallbackMessage {
  service: Service
  token: string
}

export interface PlaylistUser {
  service: Service
  id: string
  name: string
  image?: string
  token: string
}

export interface PlaylistData {
  user: PlaylistUser
  service: Service
  id: string
  missingTracks: string[]
}

export const authCallbackUrl = location.origin + '/callback/'

export function handleMessage(event: MessageEvent) {
  const { isTrusted, data } = event
  if (isTrusted && isCallbackMessage(data)) {
    return data
  } else {
    return null
  }
}

const isCallbackMessage = (message: any): message is CallbackMessage => {
  return (
    message &&
    'service' in message &&
    typeof message.service === 'string' &&
    ['spotify', 'deezer'].includes(message.service) &&
    'token' in message &&
    message.token &&
    typeof message.token === 'string'
  )
}

export async function createPlaylist(
  msg: CallbackMessage,
  t: TFunction,
  tracks: TopTracks['resources'],
  imageUrl: string
) {
  const name = t('playlist.creation.name')
  const description = t('playlist.creation.description')

  if (msg.service === 'spotify') {
    return createSpotifyPlaylist(msg.token, name, description, tracks, imageUrl)
  } else if (msg.service === 'deezer') {
    return createDeezerPlaylist(msg.token, name, description, tracks, imageUrl)
  } else {
    throw new Error('Invalid service')
  }
}
