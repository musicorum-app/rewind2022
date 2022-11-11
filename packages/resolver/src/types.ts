import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'

export interface Track extends Omit<LastfmRecentTracksTrack, 'images'> {
  image: string | null
}

export interface FirstScrobblesData {
  items: Track[]
  firstScrobbleTrackCount: number
}

export interface RewindData {
  firstScrobbles: FirstScrobblesData
}
