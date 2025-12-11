import defaultUserImage from '../assets/defaultUser.svg?inline'
import defaultTrackImage from '../assets/defaultTrack.svg?inline'
import defaultAlbumImage from '../assets/defaultAlbum.svg?inline'
import defaultArtistImage from '../assets/defaultArtist.svg?inline'
import { Image } from './rewindDataExtras'

export enum ImageType {
  USER = 'USER',
  TRACK = 'TRACK',
  ALBUM = 'ALBUM',
  ARTIST = 'ARTIST'
}

export const imageTypeDefaultImages: Record<ImageType, string> = {
  [ImageType.USER]: defaultUserImage,
  [ImageType.TRACK]: defaultTrackImage,
  [ImageType.ALBUM]: defaultAlbumImage,
  [ImageType.ARTIST]: defaultArtistImage
}

export function getImage(img: Image, size?: number) {
  let imgUrl = img.url

  if (size) {
    imgUrl = imgUrl?.replace('/300x300/', `/${size}x${size}/`) ?? null
  }

  return imgUrl
}
