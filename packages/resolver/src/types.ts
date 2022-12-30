import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'
import { ArtistResource, Image } from './api/types'

export interface Track {
  name: string
  artist: string
  album: string
  date?: number
  image: string | null
}

export interface TrackWithResource extends Track {
  resource: {
    spotify_id: string | null
    deezer_id: number | null
    preview: string | null
    tags: string[]
  } | null
}

export interface Artist {
  name: string
  scrobbles: number
  image: string | null
}

export interface ArtistWithResource extends Artist {
  resource: {
    spotify_id: string | null
    deezer_id: number | null
    genres: string[]
    tags: string[]
    popularity: number | null
    images: Image[]
  } | null
}

export interface Album {
  name: string
  artist?: string
  image: string | null
}

export type WithScrobbles<T> = T & { scrobbles: number }

export type EntityTop<E> = {
  items: WithScrobbles<E>[]
  total: number
}

export interface TopArtists extends EntityTop<ArtistWithResource> {
  popularity: {
    high: ArtistWithResource | null
    low: ArtistWithResource | null
    average: number
  }
}

export interface TopTracks extends EntityTop<TrackWithResource> {
  resources: {
    name: string
    artist: string
    album: string | null
    spotify_id: string | null
    preview: string | null
    deezer_id: number | null
    tags: string[]
  }[]
}

export interface FirstScrobblesData {
  items: TrackWithResource[]
  firstScrobbleTrackCount: number
}

export const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
] as const

export type Month = typeof months[number]

export interface ScrobblesData {
  total: number
  lastYearTotal: number
  lastYearPercentDiff: number
  dailyAverage: number
  biggestStreak: {
    daysCount: number
    from: number
    to: number
  }
  goldenDay: {
    count: number
    date: number
  }
  months: Record<Month, number>
}

export interface RewindData {
  user: string
  firstScrobbles: FirstScrobblesData
  scrobbles: ScrobblesData
  artists: TopArtists
  tracks: TopTracks
  albums: EntityTop<Album>
}
