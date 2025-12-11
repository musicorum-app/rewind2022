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
import musicorumLogo from '../../assets/logo.svg'
import { createLogo } from '../../utils/canvas'
import { loadImageAsset } from '../image'
import { RewindData } from '@rewind/resolver/src/types'

const size = 400
const margin = 30
const imageMargin = 12
const barHeight = 54
const barPadding = 24

export async function renderPlaylistImage(
  user: LastfmUserInfo,
  rewindData: RewindData,
  paletteType: PaletteType
) {
  const palette = Palettes[paletteType]

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const qdr = new Quadro(ctx)

  qdr.fillStyle = palette.darkerColor
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

  const image = await loadImageAsset(
    user.images[3]?.url || rewindData.artists.items[0].image,
    ImageType.USER
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

  const mainColor = palette.darkerColor
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
    '2024',
    size - margin - barPadding,
    size - margin - barHeight / 2
  )

  const blob = await canvasToBlob(canvas)
  canvas.remove()
  return blob
}
