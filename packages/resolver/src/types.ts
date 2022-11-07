import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'

export interface Track extends Omit<LastfmRecentTracksTrack, 'images'> {
  image: string | null
}

export interface RewindData {
  firstScrobbles: Track[]
}
