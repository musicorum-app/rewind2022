import {
  LastfmRecentTracksTrack,
  LastfmUserInfo
} from '@musicorum/lastfm/dist/types/packages/user'
import { loadFont } from '@rewind/core/src/utils/canvas'
import {
  Album,
  ArtistWithResource,
  EntityTop,
  RewindData,
  TopArtistItem,
  TopArtists,
  TopTracks,
  Track,
  TrackWithResource,
  WithScrobbles
} from '@rewind/resolver/src/types'
import chroma from 'chroma-js'
import { Palettes, PaletteType } from '../theme/colors'
import {
  extractImageColor,
  extractImageColors,
  loadImage,
  preloadImage
} from './image'
import { getClosestPalette, getImagePalettes } from './image/palette'
import { renderPlaylistImage } from './image/playlist'
import { renderSquareShareImage } from './image/squareShare'
import { renderStoriesShareImage } from './image/storiesShare'
import { getLargeLastfmImage } from './lastfm'
import { renderPlaceholder } from './image/placeholder'
import { renderTopArtistImage } from './image/artistShare'

export interface Image {
  color: string | null
  palette: PaletteType | null
  url: string | null
}

export type WithImage<T> = Omit<T, 'image'> & {
  image: Image
}

export interface RewindTrack extends Omit<Track, 'image'> {
  image: Image
}

export interface RewindTrackWithResource
  extends Omit<TrackWithResource, 'image'> {
  image: Image
}

export interface FirstScrobblesData {
  items: WithImage<TrackWithResource>[]
  firstScrobbleTrackCount: number
}

export interface GeneratedImage {
  url: string
  palette: PaletteType
}

export interface ArtistShare {
  image: GeneratedImage
  artist: WithImage<ArtistWithResource>
}

export interface RewindData2023
  extends Omit<RewindData, 'firstScrobbles' | 'tracks' | 'artists' | 'albums'> {
  firstScrobbles: FirstScrobblesData
  tracks: Omit<TopTracks, 'items'> & {
    items: WithImage<WithScrobbles<TrackWithResource>>[]
  }
  artists: {
    total: number
    items: WithImage<WithScrobbles<ArtistWithResource>>[]
    popularity: {
      high: WithImage<ArtistWithResource> | null
      low: WithImage<ArtistWithResource> | null
      average: number
    }
  }
  albums: Omit<EntityTop<Album>, 'items'> & {
    items: WithImage<WithScrobbles<Album>>[]
  }
  images: {
    playlist: GeneratedImage[]
    squareShare: GeneratedImage[]
    storiesShare: GeneratedImage[]
    artistShares: ArtistShare[]
  }
}

async function convertTrack<T extends { image: string | null }>(
  old: T,
  preLoadImage = false,
  getPalette = false
): Promise<WithImage<T>> {
  const url = old.image
  let color = null

  if (preLoadImage && url) {
    try {
      await preloadImage(url)
    } catch (err) {
      console.error('could not load image', url)
    }
  }

  if (getPalette && url) {
    try {
      color = await extractImageColor(url)
    } catch (err) {
      console.error('could not parse image color', url)
    }
  }

  return {
    ...old,
    image: {
      url,
      color,
      palette: color ? getClosestPalette(color) : null
    }
  }
}

export async function sanitizeRewindData(
  rewindData: RewindData,
  user: LastfmUserInfo
): Promise<RewindData2023> {
  const firstScrobbles = await Promise.all(
    rewindData.firstScrobbles.items.map((track, i) =>
      convertTrack(track, true, i === 0)
    )
  )

  const topTracks = await Promise.all(
    rewindData.tracks.items.map((track, i) =>
      convertTrack(track, true, i === 0)
    )
  )

  const topArtists = await Promise.all(
    rewindData.artists.items.map((artist, i) =>
      convertTrack(artist, true, true)
    )
  )

  const topAlbums = await Promise.all(
    rewindData.albums.items.map((album, i) =>
      convertTrack(album, false, i === 0)
    )
  )

  const { popularity } = rewindData.artists

  return {
    ...rewindData,
    firstScrobbles: {
      items: firstScrobbles,
      firstScrobbleTrackCount: rewindData.firstScrobbles.firstScrobbleTrackCount
    },
    tracks: {
      ...rewindData.tracks,
      items: topTracks
    },
    artists: {
      total: rewindData.artists.total,
      items: topArtists,
      popularity: {
        high: popularity.high
          ? await convertTrack(popularity.high, true, true)
          : null,
        low: popularity.low
          ? await convertTrack(popularity.low, true, true)
          : null,
        average: rewindData.artists.popularity.average
      }
    },
    albums: {
      total: rewindData.albums.total,
      items: topAlbums
    },
    images: await generateImages(user, rewindData, topArtists)
  }
}

async function generateImages(
  user: LastfmUserInfo,
  rewindData: RewindData,
  topArtists: WithImage<TopArtistItem>[]
): Promise<RewindData2023['images']> {
  const userPalettes = await getImagePalettes(user.images[3]?.url)
  const playlistImages: GeneratedImage[] = []
  const storiesShareImages: GeneratedImage[] = []
  const squareShareImages: GeneratedImage[] = []
  const artistShareImages: ArtistShare[] = []

  for (const p of userPalettes) {
    const playlistBlob = await renderPlaylistImage(user, rewindData, p)
    playlistImages.push({
      palette: p,
      url: URL.createObjectURL(playlistBlob)
    })

    const shareBlob = await renderStoriesShareImage(user, rewindData, p)
    storiesShareImages.push({
      palette: p,
      url: URL.createObjectURL(shareBlob)
    })

    const squareBlob = await renderSquareShareImage(user, rewindData, p)
    squareShareImages.push({
      palette: p,
      url: URL.createObjectURL(squareBlob)
    })
  }

  for (const artist of topArtists) {
    const palette = artist.image.palette || PaletteType.Candy
    const image = await renderTopArtistImage(user, rewindData, artist)

    artistShareImages.push({
      artist,
      image: {
        palette,
        url: URL.createObjectURL(image)
      }
    })
  }

  playlistImages.map((i) => i.url).forEach((u) => console.log(u))

  return {
    playlist: playlistImages,
    squareShare: squareShareImages,
    storiesShare: storiesShareImages,
    artistShares: artistShareImages
  }
}
