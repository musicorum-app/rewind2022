import gsap from 'gsap'
import { Gradient, Palette, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export const lastArtistShareBackground = {
  value: Palettes.NatureGreen
}

export function createArtistShareTimelineForward(
  backwardPalette: Palette,
  palette: Palette
) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'asr-forward'
      }
    })
    .fromTo(
      '#collage-image',
      {
        scale: 1,
        opacity: 1
      },
      {
        scale: 1.5,
        opacity: 0,
        ease: 'power2.in',
        duration: 0.5
      },
      '0'
    )
    .fromTo(
      '#clg h2, #clg button',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.3
      },
      '0.3'
    )
    .fromTo(
      '#asr .text',
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
      '#asr .image-share',
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
        background: backwardPalette.darkerColor
      },
      {
        background: palette.darkerColor,
        ease: 'linear'
      },
      '0.3'
    )
}

export function createArtistShareTimelineBackward(
  backwardPalette: Palette,
  palette: Palette
) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'asr-backward'
      }
    })
    .fromTo(
      '#asr .text',
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
      '#asr .image-share',
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
      '#collage-image',
      {
        scale: 1.2,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.4
      }
    )
    .fromTo(
      '#clg h2, #clg button',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.7
      }
    )
    .fromTo(
      'body',
      {
        background: palette.darkerColor
      },
      {
        background: backwardPalette.darkerColor,
        duration: 0.4,
        ease: 'linear'
      },
      '0.3'
    )
}
