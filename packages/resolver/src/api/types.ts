import { ArtistWithResource, EntityTop } from '../types'

export interface Image {
  hash: string
  url: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
}

export interface Resource {
  hash: string
  explicit: null
  source: 'SPOTIFY' | 'DEEZER' | 'LASTFM'
  images: Image[]
}

export interface ResourceItem {
  hash: string
  name: string
  spotify_id: string | null
  deezer_id: number | null
  preferred_resource: string | null
  resources: Resource[]
}

export interface ArtistResource extends ResourceItem {
  genres: string[]
  tags: string[]
  popularity: number | null
}

export interface TrackResource extends ResourceItem {
  preview: string | null
}
