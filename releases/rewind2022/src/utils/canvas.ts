import { Quadro } from '@musicorum/quadro'
import { loadImage } from '../modules/image'
import musicorumLogo from '../assets/logo.svg'

export async function createLogo(color: string, width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const quadro = new Quadro(canvas.getContext('2d')!)

  quadro.fillStyle = color
  quadro.fillRect(0, 0, width, height)

  quadro.globalCompositeOperation = 'destination-in'
  const logo = await loadImage(musicorumLogo)
  console.log(logo)
  quadro.drawImage(logo, 0, 0, width, height)

  return canvas
}
