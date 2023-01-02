import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'
import { ResolveStep } from '..'
import { getArtistsResources, getTracksResources } from '../api/musicorum'
import { ArtistResource, TrackResource } from '../api/types'
import {
  Album,
  EntityTop,
  TopArtists,
  TopTracks,
  TrackWithResource,
  WithScrobbles
} from '../types'
import { Artist, ArtistWithResource, Track } from '../types'
import { aggregate, sortMapWithArray } from '../utils'

function getTop(recentTracks: Track[], hashFn: (track: Track) => string) {
  const aggregator = aggregate(recentTracks, hashFn)

  return sortMapWithArray(aggregator)
}

export function getTopTracks(recentTracks: Track[]) {
  return getTop(recentTracks, (track) => `${track.name}_${track.artist}`)
}

export async function parseTopTracks(top: Track[][]): Promise<TopTracks> {
  const trackResources = await getTracksResources(
    top.slice(0, 100).map((t) => ({
      name: t[0].name,
      artist: t[0].artist ? t[0].artist : undefined,
      album: t[0].album ? t[0].album : undefined
    }))
  )

  const tracks: WithScrobbles<TrackWithResource>[] = top
    .slice(0, 150)
    .map((tracks, index) => {
      const resource = trackResources[index] as TrackResource | null

      return {
        name: tracks[0].name,
        album: tracks[0].album,
        artist: tracks[0].artist,
        scrobbles: tracks.length,
        date: 0,
        image: resource?.resources[0]?.images[0]?.url || null,
        resource
      }
    })

  const resources: TopTracks['resources'] = tracks
    .slice(0, 150)
    .map((track) => ({
      name: track.name,
      artist: track.artist,
      album: track.album,
      spotify_id: track.resource?.spotify_id || null,
      deezer_id: track.resource?.deezer_id || null,
      preview: track.resource?.preview || null,
      tags: track.resource?.tags || []
    }))

  return {
    total: top.length,
    items: tracks.slice(0, 6),
    resources
  }
}

export async function getTopArtists(
  recentTracks: Track[]
): Promise<TopArtists> {
  const top = getTop(recentTracks, (track) => track.artist)

  const resources = await getArtistsResources(
    top.slice(0, 100).map((t) => t[0].artist)
  )

  const artists: ArtistWithResource[] = top
    .slice(0, 100)
    .map((tracks, index) => {
      const resource = resources[index] as ArtistResource | null
      return {
        name: tracks[0].artist,
        scrobbles: tracks.length,
        resource: resource
          ? {
              spotify_id: resource.spotify_id,
              deezer_id: resource.deezer_id,
              genres: resource.genres,
              tags: resource.tags,
              popularity: resource.popularity,
              images: resource.resources[0]?.images
            }
          : null,
        image: resource?.resources[0]?.images[0]?.url ?? null
      }
    })

  const sorted = artists
    .filter((a) => !!a.resource?.popularity)
    .sort((a, b) => b.resource!.popularity! - a.resource!.popularity!)

  console.log(sorted.map((a) => a.resource!.popularity!))

  const average =
    sorted.map((a) => a.resource!.popularity!).reduce((a, b) => a + b, 0) /
    sorted.length

  return {
    total: top.length,
    items: artists.slice(0, 6),
    popularity: {
      high: sorted?.at(0) || null,
      low: sorted?.at(-1) || null,
      average
    }
  }
}

export function getTopAlbums(recentTracks: Track[]): EntityTop<Album> {
  const top = getTop(recentTracks, (track) => `${track.album}_${track.artist}`)

  console.log(top)

  const items = top.slice(0, 100).map((tracks) => ({
    name: tracks[0].album,
    artist: tracks[0].artist,
    image: tracks.find((t) => !!t.image)?.image ?? null,
    scrobbles: tracks.length
  }))

  return {
    total: top.length,
    items
  }
}
