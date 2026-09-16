import { Gradient } from '../theme/colors'

export function gradientToCss(gradient: Gradient) {
  return `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
}
