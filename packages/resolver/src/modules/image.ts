import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'
import { Track } from '../types'

const defaultTrackImageHash = '2a96cbd8b46e442fc41c2b86b821562f'

export function removeDefaultTrackImage(track: LastfmRecentTracksTrack): Track {
  let image = track.images?.[3]?.url as string | null

  if (image?.includes(defaultTrackImageHash)) {
    image = null
  }

  return {
    ...track,
    image
  }
}
