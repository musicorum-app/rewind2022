import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import { Quadro } from '@musicorum/quadro'
import { Palettes, PaletteType } from '../../theme/colors'
import {
  canvasToBlob,
  drawRoundedRect,
  loadFont,
  roundedCanvas
} from '@rewind/core/src/utils/canvas'
import { loadImage } from '../image'
import { imageTypeDefaultImages } from '../lastfmImage'
import musicorumLogo from '../../assets/logo.svg'
import { createLogo } from '../../utils/canvas'

const size = 400
const margin = 30
const imageMargin = 12
const barHeight = 54
const barPadding = 24

export async function renderPlaylistImage(
  user: LastfmUserInfo,
  paletteType: PaletteType
) {
  const palette = Palettes[paletteType]

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
    margin
  )
  ctx.fill()

  const image = await loadImage(
    user.images[3]?.url || imageTypeDefaultImages.USER
  )

  const imageSize = size - (margin + imageMargin) * 2

  const imageCanvas = roundedCanvas(
    image,
    imageSize,
    imageSize,
    margin - imageMargin
  )
  qdr.xAlign = 'center'
  qdr.yAlign = 'center'
  qdr.drawImage(imageCanvas, size / 2, size / 2, imageSize, imageSize)

  const barY = size - margin - barHeight

  ctx.beginPath()
  ctx.moveTo(margin, barY)
  ctx.arcTo(margin, size - margin, size / 2, size - margin, margin)
  ctx.arcTo(size - margin, size - margin, size - margin, barY, margin)
  ctx.lineTo(size - margin, barY)
  ctx.closePath()
  ctx.fill()

  const logoWidth = 130 * 1.1
  const logoHeight = 18 * 1.1

  const mainColor = palette.gradient[0]
  const logo = await createLogo(mainColor, logoWidth, logoHeight)

  qdr.xAlign = 'left'
  qdr.yAlign = 'center'
  qdr.drawImage(
    logo,
    margin + barPadding,
    size - margin - barHeight / 2,
    logoWidth,
    logoHeight
  )

  ctx.fillStyle = mainColor
  ctx.textAlign = 'end'
  ctx.textBaseline = 'middle'
  ctx.font = '900 24px Satoshi-Black'

  await loadFont('900 24px Satoshi-Black')

  ctx.fillText(
    '2022',
    size - margin - barPadding,
    size - margin - barHeight / 2
  )

  const blob = await canvasToBlob(canvas)
  canvas.remove()
  return blob
}
