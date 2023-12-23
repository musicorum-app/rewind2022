import { Quadro } from '@musicorum/quadro'
import { PaletteType, Palettes } from '../../theme/colors'
import { ArtistShare, WithImage } from '../rewindDataExtras'
import {
  canvasToBlob,
  drawRoundedRect,
  loadFont,
  roundedCanvas
} from '@rewind/core/src/utils/canvas'
import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import {
  ArtistWithResource,
  RewindData,
  TopArtistItem
} from '@rewind/resolver/src/types'
import { ImageType, imageTypeDefaultImages } from '../lastfmImage'
import { createListCanvas, defaultTitleFont } from './common'
import { createLogo } from '../../utils/canvas'
import { loadImageAsset } from '../image'

const width = 720
const height = 1280
const margin = 60
const radius = 60
const padding = 40
const spacing = 16

const artistImageSize = width - margin * 2 - padding * 2

const titleFont = '900 22px Satoshi-Black'

export async function renderTopArtistImage(
  user: LastfmUserInfo,
  rewindData: RewindData,
  artist: WithImage<TopArtistItem>
) {
  const palette = Palettes[artist.image.palette ?? PaletteType.Sky]

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const qdr = new Quadro(ctx)

  qdr.fillStyle = palette.color
  qdr.fillRect(0, 0, width, height)

  qdr.fillStyle = palette.darkerColor
  const boxHeight = height - margin * 2 - artistImageSize / 2
  drawRoundedRect(
    ctx,
    margin,
    margin + artistImageSize / 2,
    width - margin * 2,
    boxHeight,
    radius
  )
  ctx.fill()

  const artistImage = await loadImageAsset(artist.image.url, ImageType.ARTIST)

  const artistImageCanvas = roundedCanvas(
    artistImage,
    artistImageSize,
    artistImageSize,
    radius - padding / 2
  )

  qdr.xAlign = 'center'
  qdr.yAlign = 'top'
  qdr.drawImage(
    artistImageCanvas,
    width / 2,
    margin,
    artistImageSize,
    artistImageSize
  )

  const textsX = margin + padding
  let textsY = margin + padding + artistImageSize
  const maxTextWidth = width - (padding + margin) * 2

  qdr.fillStyle = palette.color

  await loadFont(titleFont)
  await loadFont('900 80px Satoshi-Black')
  qdr.textBaseline = 'top'

  // artist name
  ctx.font = titleFont
  qdr.textOverflow = 'ellipsis'
  ctx.fillText('MY FAVORITE ARTIST', textsX, textsY, maxTextWidth)

  ctx.font = '900 70px Satoshi-Black'

  const topArtistText = artist.name
  const artistNameMetrics = ctx.measureText(topArtistText)
  const titleWidth = Math.min(artistNameMetrics.width, maxTextWidth)

  qdr.xAlign = 'left'
  qdr.yAlign = 'top'

  qdr.fillRect(
    textsX - 2,
    textsY - 1 + spacing + 12,
    titleWidth + 4,
    artistNameMetrics.actualBoundingBoxDescent + 2
  )

  qdr.fillStyle = palette.darkerColor
  qdr.writeTextLine(
    topArtistText,
    textsX,
    textsY + spacing / 2 + 18,
    titleWidth
  )

  // scrobbles
  textsY += 110
  qdr.fillStyle = palette.color
  ctx.font = titleFont
  ctx.fillText('SCROBBLES', textsX, textsY, maxTextWidth)

  ctx.font = '900 70px Satoshi-Black'

  const formatter = new Intl.NumberFormat()
  const scrobblesText = formatter.format(artist.scrobbles)
  const scrobblesTextMetrics = ctx.measureText(scrobblesText)

  qdr.fillRect(
    textsX - 2,
    textsY - 1 + spacing + 12,
    scrobblesTextMetrics.width + 4,
    scrobblesTextMetrics.actualBoundingBoxDescent + 2
  )

  qdr.fillStyle = palette.darkerColor
  qdr.textBaseline = 'top'
  qdr.writeTextLine(
    scrobblesText,
    textsX,
    textsY + spacing / 2 + 18,
    titleWidth
  )

  // list
  textsY += 110

  const cardWidth = width - margin * 2 - padding * 2
  const cardHeight = 290
  const textColor = 'white'
  const cardMargin = margin + padding
  const cardsY = textsY
  qdr.yAlign = 'top'

  const topArtistsCanvas = createListCanvas(
    'MOST LISTENED TRACKS',
    artist.topTracks
      .map((t) => [t.name, t.scrobbles] as [string, number])
      .slice(0, 5),
    cardWidth,
    cardHeight,
    palette,
    textColor,
    titleFont,
    '900 36px Satoshi-Black',
    46
  )

  qdr.drawImage(topArtistsCanvas, cardMargin, cardsY, cardWidth, cardHeight)

  // footer
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
    height - margin - 110 / 2,
    logoWidth,
    logoHeight
  )

  ctx.fillStyle = palette.color
  ctx.textAlign = 'right'
  ctx.textBaseline = 'middle'
  ctx.font = '900 38px Satoshi-Black'

  await loadFont('900 38px Satoshi-Black')

  ctx.fillText(
    '2023',
    width / 2 + endLogoWidth / 2,
    height - margin - 110 / 2 + 3
  )

  ctx.fillStyle = palette.color
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
