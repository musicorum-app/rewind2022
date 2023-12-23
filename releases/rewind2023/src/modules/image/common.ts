import { Quadro } from '@musicorum/quadro'
import { loadFont } from '@rewind/core/src/utils/canvas'
import { Palette } from '../../theme/colors'

export const defaultTitleFont = '900 18px Satoshi-Black'
export const defaultValueFont = '900 25px Satoshi-Black'

export function createListCanvas(
  title: string,
  lines: string[] | [string, number][],
  width: number,
  height: number,
  palette: Palette,
  itemColor: string,
  titleFont = defaultTitleFont,
  valueFont = defaultValueFont,
  lineHeight = 34
) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')!
  const qdr = new Quadro(ctx)
  qdr.textOverflow = 'ellipsis'

  ctx.font = titleFont
  const titlePadding = 0

  ctx.textAlign = 'start'
  ctx.textBaseline = 'top'

  ctx.fillStyle = palette.color
  qdr.writeTextLine(title, titlePadding, 3, width)

  qdr.font = valueFont

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const paddingX = 2
    qdr.fillStyle = itemColor

    if (Array.isArray(line)) {
      const [name, value] = line
      const numberWidth = ctx.measureText(value.toString()).width
      qdr.textAlign = 'start'
      qdr.writeTextLine(
        name,
        paddingX,
        lineHeight * (i + 1),
        width - numberWidth - 10
      )
      qdr.textAlign = 'end'
      qdr.writeTextLine(
        value.toString(),
        width - paddingX,
        lineHeight * (i + 1),
        numberWidth + 5
      )
    } else {
      qdr.writeTextLine(line, paddingX, lineHeight * (i + 1), width)
    }
  }

  return canvas
}
