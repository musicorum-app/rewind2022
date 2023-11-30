import { Quadro } from '@musicorum/quadro'
import { loadFont } from '@rewind/core/src/utils/canvas'

export const defaultTitleFont = '900 18px Satoshi-Black'
export const defaultValueFont = '900 25px Satoshi-Black'

export function createListCanvas(
  title: string,
  lines: string[],
  width: number,
  height: number,
  mainColor: string,
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
  const titleHeight = ctx.measureText('TEST FONT').actualBoundingBoxDescent
  const titleActualSize = titleHeight * 1.6

  ctx.textAlign = 'start'
  ctx.textBaseline = 'top'
  ctx.fillStyle = mainColor

  qdr.writeTextLine(title, 0, 2, width)

  qdr.fillStyle = itemColor
  qdr.font = valueFont

  const formatter = new Intl.NumberFormat()

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    qdr.writeTextLine(line, 0, lineHeight * (i + 1), width)
  }

  return canvas
}
