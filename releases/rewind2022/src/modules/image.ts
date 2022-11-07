import chroma from 'chroma-js'
import {
  Colors,
  extractColorsFromImageData
} from 'extract-colors/dist/extract-colors.umd.js'

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.crossOrigin = 'anonymous'

    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', (ev) => {
      reject(ev.error)
    })
  })
}

export async function preloadImage(url: string) {
  const img = await fetch(url).then((r) => r.blob())
  return URL.createObjectURL(img)
}

function printColors(colors: Colors[]) {
  colors.forEach((c) => {
    const textColor = chroma(c.hex).luminance() > 0.5 ? 'black' : 'white'
    console.log(
      `%c${c.hex}%c - ${c.area.toFixed(2)}% - ${(c.saturation * 100).toFixed(
        2
      )}%`,
      `background: ${c.hex}; color: ${textColor}; padding: 2px 4px`,
      'background: transparent; color: inherit'
    )
  })
}

function printImage(img: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16

  const ctx = canvas.getContext('2d')
  ctx?.drawImage(img, 0, 0, 16, 16)

  const b64Url = canvas.toDataURL('image/jpeg', 60)
  // @ts-expect-error aaaa
  window.b64Url = b64Url
  console.log(
    `%c++++`,
    `font-size: 32px; padding: 16px 16px; line-height: 16px; background: url('${b64Url}'); background-size: contain;color: transparent;background-repeat: no-repeat`
  )
}

export async function extractImageColor(img: HTMLImageElement | string) {
  if (typeof img === 'string') {
    img = await loadImage(img)
  }

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx?.drawImage(img, 0, 0)

  const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)

  if (!imageData) return null

  const colors = extractColorsFromImageData(imageData).slice(0, 4)

  if (import.meta.env) {
    console.log(
      `%c* Analyzing colors for ${img.src}`,
      'border-top: 1px solid white'
    )
    printImage(img)
    console.log('* Output colors')
    printColors(colors)
  }

  let highAreaColors = colors.filter((c) => c.area >= 30)

  if (highAreaColors.length === 0) {
    highAreaColors = colors.filter((c) => c.area >= 20)
  }
  if (highAreaColors.length === 0) {
    highAreaColors = colors.filter((c) => c.area >= 10)
  }

  if (import.meta.env) {
    console.log('* Filtered colors')
    if (highAreaColors.length) printColors(highAreaColors)
    else console.log('%cnone', 'color: gray; font-style: italic;')
  }

  const color = (highAreaColors.length >= 1 ? highAreaColors : colors)
    .sort((a, b) => b.saturation - a.saturation)
    .at(0)

  if (import.meta.env && color) {
    console.log('* Result color')
    printColors([color])
  }

  return color ? color.hex : null
}
