import PaginatedResult from '@musicorum/lastfm/dist/PaginatedResource'
import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'

const normalize = (str: string) => str.toLowerCase().replaceAll(' ', '')

const hashTrack = (track: LastfmRecentTracksTrack) =>
  normalize(`${track.name}_${track.artist.name}`)
const hashArtist = (track: LastfmRecentTracksTrack) => track.artist.name

export function getTopTracks(
  recentTracks: PaginatedResult<LastfmRecentTracksTrack>
) {
  const aggregator = new Map<string, Set<LastfmRecentTracksTrack>>()

  for (const track of recentTracks.getAll()) {
    const hash = hashTrack(track)
    if (!aggregator.has(hash)) {
      aggregator.set(hash, new Set())
    }

    aggregator.get(hash)!.add(track)
  }

  const sorted = [...aggregator.entries()].sort(
    ([, tracksA], [, tracksB]) => tracksB.size - tracksA.size
  )

  return sorted
}

export function getTopArtists(
  recentTracks: PaginatedResult<LastfmRecentTracksTrack>
) {
  const aggregator = new Map<string, Set<LastfmRecentTracksTrack['artist']>>()
}
