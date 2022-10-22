import chroma from 'chroma-js'
import { GradientPalette } from '../theme/colors'

const body = document.body

export function interpolateBackgroundGradient(
  from: GradientPalette,
  to: GradientPalette,
  value: number
) {
  const color1 = chroma.scale([from[0], to[0]])(value)
  const color2 = chroma.scale([from[1], to[1]])(value)

  body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`
}
