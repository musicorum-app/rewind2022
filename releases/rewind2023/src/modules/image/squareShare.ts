import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import { Quadro } from '@musicorum/quadro'
import {
  canvasToBlob,
  drawRoundedRect,
  loadFont,
  roundedCanvas
} from '@rewind/core/src/utils/canvas'
import { RewindData } from '@rewind/resolver/src/types'
import { Palettes, PaletteType } from '../../theme/colors'
import { createLogo } from '../../utils/canvas'
import { loadImage } from '../image'
import { imageTypeDefaultImages } from '../lastfmImage'
import { createListCanvas } from './common'

const size = 1280
const margin = 60
const radius = 60
const padding = 40
const mainImageSize = 450
const sideImagesSize = 350
const sideImagesRadius = 14
const spacing = 16
const barHeight = 80
const barPadding = 45

const titleFont = '900 26px Satoshi-Black'
const valueFont = '900 36px Satoshi-Black'
const lineHeight = 44

export async function renderSquareShareImage(
  user: LastfmUserInfo,
  rewindData: RewindData,
  paletteType: PaletteType
) {
  const palette = Palettes[paletteType]
  const textColor = paletteType === PaletteType.Black ? 'black' : 'white'

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const qdr = new Quadro(ctx)

  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, palette.gradient[0])
  gradient.addColorStop(1, palette.gradient[1])

  qdr.fillStyle = gradient
  qdr.fillRect(0, 0, size, size)

  qdr.fillStyle = palette.color
  drawRoundedRect(
    ctx,
    margin,
    margin,
    size - margin * 2,
    size - margin * 2,
    radius
  )
  ctx.fill()

  const artistImage = await loadImage(
    rewindData.artists.items[0].image || imageTypeDefaultImages.ARTIST
  )

  const albumImage = await loadImage(
    rewindData.albums.items[0].image || imageTypeDefaultImages.ALBUM
  )

  const sideImagesY = margin + padding + mainImageSize / 2

  const artistImageCanvas = roundedCanvas(
    artistImage,
    sideImagesSize,
    sideImagesSize,
    sideImagesRadius
  )

  qdr.globalAlpha = 0.5
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
    size - margin - padding,
    sideImagesY,
    sideImagesSize,
    sideImagesSize
  )

  qdr.globalAlpha = 1

  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'
  ctx.shadowBlur = 120
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.fillRect(size / 2, sideImagesY, mainImageSize, mainImageSize)

  const image = await loadImage(
    user.images[3]?.url || imageTypeDefaultImages.USER
  )

  const userImageCanvas = roundedCanvas(
    image,
    sideImagesSize,
    sideImagesSize,
    sideImagesRadius
  )

  qdr.xAlign = 'center'
  qdr.drawImage(
    userImageCanvas,
    size / 2,
    sideImagesY,
    mainImageSize,
    mainImageSize
  )

  const mainColor = palette.gradient[0]

  ctx.shadowColor = 'none'
  ctx.shadowBlur = 0
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.font = '900 67px Satoshi-Black'
  qdr.textOverflow = 'ellipsis'

  await loadFont(ctx.font)

  ctx.fillText(user.name, size / 2, margin + padding * 1.5 + mainImageSize)

  ctx.fillStyle = mainColor
  ctx.font = titleFont
  await loadFont(titleFont)
  await loadFont(valueFont)

  const titlesize = ctx.measureText('TEST FONT').actualBoundingBoxDescent
  const titleActualSize = titlesize * 1.6

  ctx.textAlign = 'start'
  ctx.textBaseline = 'top'

  const textsX = margin + padding
  const textsY = margin + padding * 4.2 + mainImageSize

  qdr.writeTextLine('SCROBBLES', textsX, textsY, size - (padding + margin) * 2)
  qdr.writeTextLine(
    'TOP TAG',
    size / 2,
    textsY,
    size / 2 - (padding + margin) * 2
  )

  qdr.fillStyle = textColor
  qdr.font = '900 100px Satoshi-Black'

  const formatter = new Intl.NumberFormat()

  qdr.writeTextLine(
    formatter.format(rewindData.scrobbles.total),
    textsX,
    textsY + titleActualSize,
    size - (padding + margin) * 2
  )

  const tags = rewindData.tracks.resources.flatMap((t) => t.tags)
  const weights = new Map<string, number>()

  for (const tag of tags) {
    const weight = 1 + (weights.get(tag) || 0)
    weights.set(tag, weight)
  }

  const list = [...weights.entries()]
  const sortedList = list.sort((a, b) => b[1] - a[1]).map((f) => f[0])

  if (sortedList[0]) {
    qdr.writeTextLine(
      sortedList[0].toLowerCase(),
      size / 2,
      textsY + titleActualSize,
      (size - (padding + margin) * 2) / 2
    )
  }

  const cardsY = textsY + spacing + 62
  const remainingSpace = size - cardsY - margin - padding - barHeight - spacing
  const cardHeight = remainingSpace
  const cardWidth = (size - margin * 2 - padding * 2 - spacing) / 2
  const cardMargin = margin + padding
  const limit = 5

  qdr.yAlign = 'center'
  qdr.xAlign = 'start'

  const topArtistsCanvas = createListCanvas(
    'MOST LISTENED ARTISTS',
    rewindData.artists.items.map((i) => i.name).slice(0, limit),
    cardWidth,
    cardHeight,
    mainColor,
    textColor,
    titleFont,
    valueFont,
    lineHeight
  )

  qdr.drawImage(
    topArtistsCanvas,
    cardMargin,
    cardsY + cardWidth / 2,
    cardWidth,
    cardHeight
  )

  const topAlbumsCanvas = createListCanvas(
    'MOST LISTENED ALBUMS',
    rewindData.albums.items.map((i) => i.name).slice(0, limit),
    cardWidth,
    cardHeight,
    mainColor,
    textColor,
    titleFont,
    valueFont,
    lineHeight
  )

  qdr.xAlign = 'right'
  qdr.drawImage(
    topAlbumsCanvas,
    size - cardMargin,
    cardsY + cardWidth / 2,
    cardWidth,
    cardHeight
  )

  const barY = size - margin - barHeight
  ctx.fillStyle = mainColor

  ctx.beginPath()
  ctx.moveTo(margin, barY)
  ctx.arcTo(margin, size - margin, size / 2, size - margin, margin)
  ctx.arcTo(size - margin, size - margin, size - margin, barY, margin)
  ctx.lineTo(size - margin, barY)
  ctx.closePath()
  ctx.fill()

  const logoWidth = 130 * 1.9
  const logoHeight = 18 * 1.9

  const logo = await createLogo(palette.color, logoWidth, logoHeight)

  qdr.xAlign = 'left'
  qdr.yAlign = 'center'
  qdr.drawImage(
    logo,
    margin + barPadding,
    size - margin - barHeight / 2,
    logoWidth,
    logoHeight
  )

  ctx.fillStyle = palette.color
  ctx.textAlign = 'end'
  ctx.textBaseline = 'middle'
  ctx.font = '900 38px Satoshi-Black'

  await loadFont('900 38px Satoshi-Black')

  ctx.fillText(
    '2022',
    size - margin - barPadding,
    size - margin - barHeight / 2
  )

  ctx.fillStyle = mainColor
  ctx.font = '900 24px Satoshi-Black'
  ctx.globalAlpha = 0.45
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  const linkX = size - margin - spacing - 4
  const linkY = size - margin - barHeight - spacing
  ctx.translate(linkX, linkY)
  ctx.rotate(Math.PI / -2)
  ctx.fillText('musc.pw/rewind', 0, 0)

  const blob = await canvasToBlob(canvas)
  canvas.remove()
  return blob
}
