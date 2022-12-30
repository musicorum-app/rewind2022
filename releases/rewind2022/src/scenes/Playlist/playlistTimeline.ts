import gsap from 'gsap'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createPlaylistTimelineForward(gradient: Gradient) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'pll-forward'
      }
    })
    .fromTo(
      '#end',
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
      '#pll',
      {
        opacity: 0,
        scale: 1.2
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
        background: gradientToCss(Palettes.Black.gradient)
      },
      {
        background: gradientToCss(gradient),
        duration: 0.5,
        ease: 'linear'
      },
      '0.4'
    )
}

export function createPlaylistTimelineBackward(gradient: Gradient) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'pll-backward'
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
        scale: 1.2,
        ease: 'power3.in'
      }
    )
    .fromTo(
      '#end',
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
        background: gradientToCss(gradient)
      },
      {
        background: gradientToCss(Palettes.Black.gradient),
        duration: 0.5,
        ease: 'linear'
      },
      '0.4'
    )
}
