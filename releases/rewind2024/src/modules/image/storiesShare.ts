import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import { Quadro } from '@musicorum/quadro'
import { Palettes, PaletteType } from '../../theme/colors'
import {
  canvasToBlob,
  drawRoundedRect,
  loadFont,
  roundedCanvas
} from '@rewind/core/src/utils/canvas'
import { ImageType, imageTypeDefaultImages } from '../lastfmImage'
import { createLogo } from '../../utils/canvas'
import { RewindData } from '@rewind/resolver/src/types'
import { createListCanvas, defaultTitleFont, defaultValueFont } from './common'
import { loadImageAsset } from '../image'

const width = 720
const height = 1280
const margin = 60
const radius = 60
const padding = 40
const mainImageSize = 410
const sideImagesSize = 260
const sideImagesRadius = 14
const spacing = 16
const barHeight = 90
const barPadding = 45

export async function renderStoriesShareImage(
  user: LastfmUserInfo,
  rewindData: RewindData,
  paletteType: PaletteType
) {
  const palette = Palettes[paletteType]
  const textColor = 'white'

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const qdr = new Quadro(ctx)

  const hasUserImage = !!user.images[3]?.url

  qdr.fillStyle = palette.color
  qdr.fillRect(0, 0, width, height)

  qdr.fillStyle = palette.darkerColor
  const boxHeight = height - margin * 2 - mainImageSize / 2
  drawRoundedRect(
    ctx,
    margin,
    margin + mainImageSize / 2,
    width - margin * 2,
    boxHeight,
    radius
  )
  ctx.fill()

  const artistImage = await loadImageAsset(
    rewindData.artists.items[hasUserImage ? 0 : 1].image,
    ImageType.ARTIST
  )

  const albumImage = await loadImageAsset(
    rewindData.albums.items[0].image,
    ImageType.ALBUM
  )

  const sideImagesY = margin + mainImageSize / 2

  const artistImageCanvas = roundedCanvas(
    artistImage,
    sideImagesSize,
    sideImagesSize,
    sideImagesRadius
  )

  // qdr.globalAlpha = 0.5
  qdr.yAlign = 'center'
  qdr.drawImage(
    artistImageCanvas,
    margin + padding,
    sideImagesY,
    sideImagesSize,
    sideImagesSize
  )

  const albumImageCanvas = roundedCanvas(
    albumImage,
    sideImagesSize,
    sideImagesSize,
    sideImagesRadius
  )

  qdr.xAlign = 'right'
  qdr.drawImage(
    albumImageCanvas,
    width - margin - padding,
    sideImagesY,
    sideImagesSize,
    sideImagesSize
  )

  qdr.globalAlpha = 1

  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'
  ctx.shadowBlur = 120
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.fillRect(width / 2, sideImagesY, mainImageSize, mainImageSize)

  const mainImage = hasUserImage
    ? user.images[3]?.url
    : rewindData.artists.items[0].image
  const image = await loadImageAsset(mainImage, ImageType.USER)

  const userImageCanvas = roundedCanvas(
    image,
    sideImagesSize,
    sideImagesSize,
    sideImagesRadius
  )

  qdr.xAlign = 'center'
  qdr.drawImage(
    userImageCanvas,
    width / 2,
    sideImagesY,
    mainImageSize,
    mainImageSize
  )

  const mainColor = palette.color

  ctx.shadowColor = 'none'
  ctx.shadowBlur = 0
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = '900 36px Satoshi-Black'
  qdr.textOverflow = 'ellipsis'

  await loadFont(ctx.font)

  ctx.fillText(user.name, width / 2, margin + mainImageSize + padding / 2)

  ctx.fillStyle = mainColor
  ctx.font = defaultTitleFont
  await loadFont(defaultTitleFont)
  await loadFont(defaultValueFont)

  const titleHeight = ctx.measureText('TEST FONT').actualBoundingBoxDescent
  const titleActualSize = titleHeight * 1.6

  ctx.textAlign = 'start'
  ctx.textBaseline = 'top'

  const textsX = margin + padding
  const textsY = margin + padding * 2 + mainImageSize

  qdr.writeTextLine('SCROBBLES', textsX, textsY, width - (padding + margin) * 2)

  qdr.font = '900 80px Satoshi-Black'
  const formatter = new Intl.NumberFormat()

  const scrobblesTextMetrics = ctx.measureText(
    formatter.format(rewindData.scrobbles.total)
  )

  qdr.xAlign = 'left'
  qdr.yAlign = 'top'

  qdr.fillStyle = mainColor
  qdr.fillRect(
    textsX - 2,
    textsY - 1 + titleActualSize,
    scrobblesTextMetrics.width + 4,
    scrobblesTextMetrics.actualBoundingBoxDescent + 2
  )

  qdr.fillStyle = palette.darkerColor

  qdr.writeTextLine(
    formatter.format(rewindData.scrobbles.total),
    textsX,
    textsY + titleActualSize,
    width - (padding + margin) * 2
  )

  qdr.fillStyle = 'white'

  const cardsY = textsY + spacing + 120
  const remainingSpace =
    height - cardsY - margin - padding - barHeight - spacing
  const cardHeight = remainingSpace / 2 + 4
  const cardWidth = (width - margin * 2 - padding * 2 - spacing) / 2
  const cardMargin = margin + padding
  const limit = 6

  qdr.yAlign = 'center'
  qdr.xAlign = 'start'

  const topArtistsCanvas = createListCanvas(
    'MOST LISTENED ARTISTS',
    rewindData.artists.items.map((i) => i.name).slice(0, limit),
    cardWidth,
    cardHeight,
    palette,
    textColor
  )

  qdr.drawImage(
    topArtistsCanvas,
    cardMargin,
    cardsY + cardHeight / 2,
    cardWidth,
    cardHeight
  )

  const topAlbumsCanvas = createListCanvas(
    'MOST LISTENED ALBUMS',
    rewindData.albums.items.map((i) => i.name).slice(0, limit),
    cardWidth,
    cardHeight,
    palette,
    textColor
  )

  qdr.xAlign = 'right'
  qdr.drawImage(
    topAlbumsCanvas,
    width - cardMargin,
    cardsY + cardHeight / 2,
    cardWidth,
    cardHeight
  )

  qdr.xAlign = 'start'

  const topTracksCanvas = createListCanvas(
    'MOST LISTENED TRACKS',
    rewindData.tracks.items.map((i) => i.name).slice(0, limit),
    cardWidth,
    cardHeight,
    palette,
    textColor
  )

  qdr.drawImage(
    topTracksCanvas,
    cardMargin,
    cardsY + cardHeight * 1.5 + spacing * 1.5,
    cardWidth,
    cardHeight
  )

  const tags = rewindData.tracks.resources.flatMap((t) => t.tags)
  const weights = new Map<string, number>()

  for (const tag of tags) {
    const weight = 1 + (weights.get(tag) || 0)
    weights.set(tag, weight)
  }

  const list = [...weights.entries()]
  const sortedList = list.sort((a, b) => b[1] - a[1]).map((f) => f[0])

  const topTagsCanvas = createListCanvas(
    'MOST LISTENED TAGS',
    sortedList.slice(0, limit),
    cardWidth,
    cardHeight,
    palette,
    textColor
  )

  qdr.xAlign = 'right'
  qdr.drawImage(
    topTagsCanvas,
    width - cardMargin,
    cardsY + cardHeight * 1.5 + spacing * 1.5,
    cardWidth,
    cardHeight
  )

  const barY = height - margin - barHeight
  ctx.fillStyle = mainColor

  ctx.beginPath()
  ctx.moveTo(margin, barY)
  ctx.arcTo(margin, height - margin, width / 2, height - margin, margin)
  ctx.arcTo(width - margin, height - margin, width - margin, barY, margin)
  ctx.lineTo(width - margin, barY)
  ctx.closePath()
  // ctx.fill()

  const logoWidth = 130 * 1.9
  const logoHeight = 18 * 1.9
  const yearTextWidth = 100
  const endLogoWidth = logoWidth + yearTextWidth + 6

  const logo = await createLogo(palette.color, logoWidth, logoHeight)

  qdr.xAlign = 'left'
  qdr.yAlign = 'center'
  qdr.drawImage(
    logo,
    width / 2 - endLogoWidth / 2,
    height - margin - barHeight / 2,
    logoWidth,
    logoHeight
  )

  ctx.fillStyle = palette.color
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.font = '900 38px Satoshi-Black'

  await loadFont('900 38px Satoshi-Black')

  ctx.fillText(
    '2024',
    width / 2 + endLogoWidth / 2,
    height - margin - barHeight / 2 + 3
  )

  ctx.fillStyle = mainColor
  ctx.font = '900 19px Satoshi-Black'
  ctx.globalAlpha = 0.45
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  const linkX = width - margin - spacing
  const linkY = height - margin - spacing - margin
  ctx.translate(linkX, linkY)
  ctx.rotate(Math.PI / -2)
  ctx.fillText('musc.pw/rewind', 0, 0)

  const blob = await canvasToBlob(canvas)
  canvas.remove()
  return blob
}
