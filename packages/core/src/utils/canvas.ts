import { Quadro } from '@musicorum/quadro'

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = 'image/jpeg',
  quality = 98
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject()
        }
      },
      type,
      quality
    )
  })
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (width < 2 * radius) radius = width / 2
  if (height < 2 * radius) radius = height / 2
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

export function roundedCanvas(
  image: HTMLImageElement | HTMLCanvasElement,
  w = image.width,
  h = image.height,
  r = image.width * 0.5
): HTMLCanvasElement {
  const x = 0
  const y = 0

  const coverImageCanvas = document.createElement('canvas')
  coverImageCanvas.width = w
  coverImageCanvas.height = h
  const qdr = new Quadro(coverImageCanvas.getContext('2d')!)
  qdr.imageFit = 'cover'
  qdr.drawImage(image, 0, 0, w, h)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    '2d'
  ) as CanvasRenderingContext2D

  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()

  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(coverImageCanvas, 0, 0, w, h)

  ctx.globalCompositeOperation = 'destination-in'
  ctx.fillStyle = '#fff'
  ctx.fill()

  return canvas
}

export async function loadFont(font: string): Promise<void> {
  const fonts = (document as unknown as any).fonts
  if (fonts) {
    return fonts.load(font, 'FontTesting')
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (FontFaceObserver) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new FontFaceObserver(font).load()
    } else {
      const el = document.createElement('span')
      el.style.fontFamily = font.split(' ')[2]
      el.style.fontWeight = font.split(' ')[0]
      el.style.color = 'black'
      el.innerText = '.f'
      document.body.appendChild(el)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }
  }
}

export async function blobToBase64(source: Blob): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string')
        resolve(reader.result)
      else reject()
    }

    reader.readAsDataURL(source)
  })
}
