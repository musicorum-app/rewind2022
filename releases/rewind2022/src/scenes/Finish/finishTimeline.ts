import gsap from 'gsap'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export const lastShareBackground = {
  value: Palettes.Black.gradient as Gradient
}

export function createFinishTimelineForward() {
  console.log('ih')
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'fns-forward'
      }
    })
    .fromTo(
      '#shr .text',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -60,
        ease: 'power3.in'
      }
    )
    .fromTo(
      '#shr .image-share',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 60,
        ease: 'power3.in'
      },
      '-=0.5'
    )
    .fromTo(
      'body',
      {
        background: gradientToCss(lastShareBackground.value)
      },
      {
        background: gradientToCss(Palettes.MidnightSky.gradient),
        ease: 'linear'
      },
      '0.3'
    )
    .fromTo(
      '#fns h1, #fns h2, #fns h3, #fns p',
      {
        opacity: 0,
        scale: 1.3
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        stagger: 0.1
      },
      '-=0.3'
    )
    .fromTo(
      '#fns a, #fns button',
      {
        opacity: 0,
        scale: 1.1
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        stagger: 0.1
      },
      '-=0.1'
    )
}

export function createFinishTimelineBackward() {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'fns-backward'
      }
    })
    .fromTo(
      '#fns h1, #fns h2, #fns h3, #fns p',
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 1.3,
        duration: 0.8,
        ease: 'power3.in'
      }
    )
    .fromTo(
      '#fns a, #fns button',
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.01
      },
      '0'
    )
    .fromTo(
      'body',
      {
        background: gradientToCss(Palettes.MidnightSky.gradient)
      },
      {
        background: gradientToCss(lastShareBackground.value),
        ease: 'linear'
      },
      '0.3'
    )
    .fromTo(
      '#shr .text',
      {
        opacity: 0,
        y: -60
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )
    .fromTo(
      '#shr .image-share',
      {
        opacity: 0,
        y: 60
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      },
      '-=1'
    )
}
