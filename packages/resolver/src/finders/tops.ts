import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'
import { Track } from '../types'

const normalize = (str: string) => str.toLowerCase().replaceAll(' ', '')

function getTop(recentTracks: Track[], hashFn: (track: Track) => string) {
  const aggregator = new Map<string, Track[]>()

  for (const track of recentTracks) {
    const hash = normalize(hashFn(track))
    if (!aggregator.has(hash)) {
      aggregator.set(hash, [])
    }

    aggregator.get(hash)?.push(track)
  }

  const sorted = [...aggregator.values()].sort(
    (tracksA, tracksB) => tracksB.length - tracksA.length
  )

  return sorted
}

export function getTopTracks(recentTracks: Track[]) {
  return getTop(recentTracks, (track) => `${track.name}_${track.artist.name}`)
}

export function getTopArtists(recentTracks: Track[]) {
  return getTop(recentTracks, (track) => track.artist.name)
}

export function getTopAlbums(recentTracks: Track[]) {
  return getTop(
    recentTracks,
    (track) => `${track.album.name}_${track.artist.name}`
  )
}
