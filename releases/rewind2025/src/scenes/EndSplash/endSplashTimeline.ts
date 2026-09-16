import gsap from 'gsap'
import { Gradient, Palette, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createEndSplashTimelineForward(originTarget: Palette) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'end-forward'
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
        background: originTarget.darkerColor
      },
      {
        background: Palettes.NatureGreen.darkerColor,
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )
    .fromTo(
      '#end .year-stroke',
      {
        opacity: 0,
        scale: 1.5
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1
      }
    )
    .fromTo(
      '#end .year-stroke path',
      {
        attr: {
          'stroke-dashoffset': 1
        }
      },
      {
        attr: {
          'stroke-dashoffset': 0.7
        },
        duration: 3,
        ease: 'sint.out'
      },
      '-=1'
    )
    .fromTo(
      '#end .year-background',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1.2
      },
      '-=1'
    )
    .fromTo(
      '#end span',
      {
        opacity: 0,
        y: -16
      },
      {
        opacity: 1,
        y: 0,
        ease: 'sint.out'
      },
      '-=1'
    )
}

export function createEndSplashTimelineBackward(originTarget: Palette) {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'end-backward'
      }
    })
    .fromTo(
      '#end span',
      {
        opacity: 1,
        y: 16
      },
      {
        opacity: 0,
        y: 0,
        ease: 'sine.out'
      }
    )
    .fromTo(
      '#end svg',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      },
      '0'
    )
    .fromTo(
      'body',
      {
        background: Palettes.NatureGreen.darkerColor
      },
      {
        background: originTarget.darkerColor,
        duration: 0.8,
        ease: 'linear'
      }
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
      },
      '-=0.4'
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
      '-=0.8'
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
      '-=0.6'
    )
}
