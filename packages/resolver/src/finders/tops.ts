import PaginatedResult from "@musicorum/lastfm/dist/PaginatedResource";
import { LastfmRecentTracksTrack } from "@musicorum/lastfm/dist/types/packages/user";

const hashTrack = (track: LastfmRecentTracksTrack) => `${track.name}_${track.artist.name}_${track.album.name}`
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
    ([, tracksA], [, tracksB]) => tracksA.size - tracksB.size
  )

  return sorted
}

export function getTopArtists(
  recentTracks: PaginatedResult<LastfmRecentTracksTrack>
) {
  const aggregator = new Map<string, Set<LastfmRecentTracksTrack['artist']>>()

}