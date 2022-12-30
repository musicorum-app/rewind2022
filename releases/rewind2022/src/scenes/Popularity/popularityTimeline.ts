import gsap from 'gsap'
import { stagger } from 'motion'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createPopularityTimelineForward(gradient: Gradient) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'pop-forward'
      }
    })
    .fromTo(
      '#tag',
      {
        opacity: 1
      },
      {
        opacity: 0
      }
    )
    .fromTo(
      'body',
      {
        background: gradientToCss(Palettes.MidnightSky.gradient)
      },
      {
        background: gradientToCss(gradient),
        ease: 'linear'
      },
      '0.4'
    )
    .fromTo(
      '#pop .image',
      {
        opacity: 0,
        scale: 1.2
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        stagger: 0.1
      }
    )
    .fromTo(
      '#pop .number',
      {
        opacity: 0,
        scale: 2
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      },
      '-=0.5'
    )
    .fromTo(
      '#pop span, #pop h5',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      },
      '-=0.2'
    )
}

export function createPopularityTimelineBackward(gradient: Gradient) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'pop-backward'
      }
    })
    .fromTo(
      '#pop .image',
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 0.8,
        ease: 'power2.in',
        stagger: 0.1
      }
    )
    .fromTo(
      '#pop span, #pop h5, #pop .number',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        stagger: 0.1
      },
      '0'
    )
    .fromTo(
      'body',
      {
        background: gradientToCss(gradient)
      },
      {
        background: gradientToCss(Palettes.MidnightSky.gradient),
        ease: 'linear'
      },
      '0.4'
    )
    .fromTo(
      '#tag',
      {
        opacity: 0,
        scale: 1.15
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        duration: 1
      }
    )
}
