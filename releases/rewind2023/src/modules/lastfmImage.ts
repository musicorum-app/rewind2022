import { LastfmImage } from '@musicorum/lastfm/dist/types/packages/common'
import defaultUserImage from '../assets/defaultUser.svg?inline'
import defaultTrackImage from '../assets/defaultTrack.svg?inline'
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
  [ImageType.ALBUM]: defaultTrackImage,
  [ImageType.ARTIST]: defaultTrackImage
}

export function getImage(img: Image, size?: number) {
  let imgUrl = img.url

  if (size) {
    imgUrl = imgUrl?.replace('/300x300/', `/${size}x${size}/`) ?? null
  }

  return imgUrl
}
