import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import { PaletteType, Palettes } from '../../theme/colors'
import { canvasToBlob, loadFont } from '@rewind/core/src/utils/canvas'

export async function renderPlaceholder(
  user: LastfmUserInfo,
  paletteType: PaletteType
) {
  const palette = Palettes[paletteType]

  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200

  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = palette.color
  ctx.fillRect(0, 0, 200, 200)

  ctx.fillStyle = palette.darkerColor

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  await loadFont('900 30px Satoshi-Black')
  ctx.font = '900 30px Satoshi-Black'
  ctx.fillText('PLACEHOLDER', 200 / 2, 200 / 2)

  const blob = await canvasToBlob(canvas)
  canvas.remove()
  return blob
}
