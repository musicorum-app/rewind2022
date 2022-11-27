import { getTracksResources } from '../api/musicorum'
import { TrackResource } from '../api/types'
import { FirstScrobblesData, Track, TrackWithResource } from '../types'

export default async function parseFirstScrobbles(
  recentTracks: Track[],
  topTracks: Track[][]
): Promise<FirstScrobblesData> {
  const firstScrobblesList = [...recentTracks].reverse()

  const firstScrobbles = [] as Track[]
  for (let i = 0; i < firstScrobblesList.length; i++) {
    const track = firstScrobblesList[i]
    if (firstScrobbles.length >= 5) {
      break
    } else if (
      // make sure to include first scrobble
      i === 0 ||
      !firstScrobbles.find((t) => t.album === track.album)
    ) {
      console.log(i)
      firstScrobbles.push(track)
    }
  }

  const firstScrobblesOnTracks = topTracks.find((tracks) =>
    tracks.find(
      (t) => t.date!.toString() === firstScrobbles[0].date!.toString()
    )
  )

  if (!firstScrobblesOnTracks) {
    throw new Error('Could not find first scrobbles count through the year')
  }

  const resources = await getTracksResources(
    firstScrobbles.map((track) => ({
      name: track.name,
      artist: track.artist,
      album: track.album
    }))
  )

  console.log(resources)

  const items: TrackWithResource[] = firstScrobbles.map((track, index) => {
    const resource = resources[index] as TrackResource | null
    return {
      ...track,
      resource: resource
        ? {
            preview: resource.preview,
            deezer_id: resource.deezer_id,
            spotify_id: resource.spotify_id
          }
        : null
    }
  })

  return {
    firstScrobbleTrackCount: firstScrobblesOnTracks.length,
    items
  }
}
