import gsap from 'gsap'
import { Gradient, Palette, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export const lastBackground = {
  value: Palettes.NatureGreen
}

export function createShareTimelineForward(palette: Palette) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'shr-forward'
      }
    })
    .fromTo(
      '#pll',
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 0.8,
        ease: 'power3.in'
      }
    )
    .fromTo(
      '#shr .text',
      {
        opacity: 0,
        scale: 0.8,
        y: -40
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'power3.out'
      }
    )
    .fromTo(
      '#shr .image-share',
      {
        opacity: 0,
        scale: 0.85,
        y: 40
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'power3.out'
      },
      '-=0.5'
    )
    .fromTo(
      'body',
      {
        background: lastBackground.value.darkerColor
      },
      {
        background: palette.darkerColor,
        ease: 'linear'
      },
      '0.3'
    )
}

export function createShareTimelineBackward(palette: Palette) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'shr-backward'
      }
    })
    .fromTo(
      '#shr .text',
      {
        opacity: 1,
        scale: 1,
        y: 0
      },
      {
        opacity: 0,
        scale: 0.8,
        y: -40,
        ease: 'power3.in'
      }
    )
    .fromTo(
      '#shr .image-share',
      {
        opacity: 1,
        scale: 1,
        y: 0
      },
      {
        opacity: 0,
        scale: 0.85,
        y: 40,
        ease: 'power3.in'
      },
      '-=0.5'
    )
    .fromTo(
      '#pll',
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power3.out'
      }
    )
    .fromTo(
      'body',
      {
        background: palette.darkerColor
      },
      {
        background: lastBackground.value.darkerColor,
        duration: 0.4,
        ease: 'linear'
      },
      '0.6'
    )
}
