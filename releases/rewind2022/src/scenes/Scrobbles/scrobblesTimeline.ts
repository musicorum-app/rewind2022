import gsap from 'gsap'
import { interpolateBetweenReferenceElements } from '../../modules/referenceInterpolator'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

const maskInterpolatioObj = {
  interpolation: 1
}

export const scrobblesForwardTimeline = (originGradient: Gradient) => {
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'scr-forward'
      }
    })
    .fromTo(
      'body',
      {
        background: gradientToCss(originGradient)
      },
      {
        background: gradientToCss(Palettes.DisplacedOcean.gradient),
        duration: 0.8
      },
      '0.4'
    )
    .fromTo(
      '#scr',
      {
        opacity: 0
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.001
      },
      '0'
    )
    .add('textsDisappear', '0')
    .fromTo(
      '#fst .first-one',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -20,
        ease: 'expo.in',
        duration: 0.6
      },
      'textsDisappear'
    )
    .fromTo(
      '#fst .track-name',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 50,
        ease: 'expo.in',
        duration: 0.6
      },
      'textsDisappear+=0.1'
    )
    .fromTo(
      '#fst .sub-text',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -50,
        ease: 'expo.in',
        duration: 0.6
      },
      'textsDisappear+=0.1'
    )
    .fromTo(
      '#first-track-ref',
      {
        width: '100%'
      },
      {
        width: '0%',
        ease: 'expo.inOut',
        duration: 1.5,
        onUpdate: () => {
          interpolateBetweenReferenceElements(
            document.querySelector('#year-splash-track-ref')!,
            document.querySelector('#first-track-ref')!,
            document.querySelector('#fst-track-image')!,
            1
          )
        },
        onComplete: () => {
          interpolateBetweenReferenceElements(
            document.querySelector('#year-splash-track-ref')!,
            document.querySelector('#first-track-ref')!,
            document.querySelector('#fst-track-image')!,
            1
          )
        }
      },
      '0'
    )
    .fromTo(
      '#fst-track-image',
      {
        opacity: 1
      },
      {
        opacity: 1,
        duration: 0.1
      },
      '0.9'
    )

  const lines = document.querySelectorAll<HTMLDivElement>('#scr .scrobble-line')
  const indexLimit = lines.length - 1
  const lineHeight = 1 /*parseInt(
    getComputedStyle(lines[0].children[0]).getPropertyValue('font-size')
  )*/

  console.log(lineHeight)
  const originY = 11 - lineHeight * indexLimit

  for (let i = 0; i < lines.length; i++) {
    const targetY = originY + i
    tl.fromTo(
      lines[i],
      {
        y: '-4.5em'
      },
      {
        y: targetY + 'em',
        duration: 4,
        ease: 'power4.out'
      },
      '0.8'
    )
  }

  tl.add('scrobbleEnd')
    .fromTo(
      '#scr .count-copy',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.0001
      }
    )
    .fromTo(
      '#scr .list-container',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.7,
        ease: 'power1.inOut'
      },
      'scrobbleEnd'
    )
    .fromTo(
      '#scr .complementary-text',
      {
        opacity: 0
      },
      {
        opacity: 1,
        stagger: 0.3
      },
      'scrobbleEnd+=0.2'
    )

  return tl
}

export const scrobblesBackwardTimeline = (originGradient: Gradient) => {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'scr-backward'
      }
    })
    .fromTo(
      '#scr',
      {
        opacity: 1,
        scale: 1,
        x: 0
      },
      {
        opacity: 0,
        scale: 0.96,
        x: 30,
        duration: 0.5,
        ease: 'power2.in'
      }
    )
    .fromTo(
      'body',
      {
        background: gradientToCss(Palettes.DisplacedOcean.gradient)
      },
      {
        background: gradientToCss(originGradient),
        duration: 0.8
      },
      '0.4'
    )
    .add('textsDisappear', '0.7')
    .fromTo(
      '#fst .first-one',
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        ease: 'expo.out',
        duration: 0.6
      },
      'textsDisappear'
    )
    .fromTo(
      '#fst .track-name',
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        ease: 'expo.out',
        duration: 0.6
      },
      'textsDisappear+=0.1'
    )
    .fromTo(
      '#fst .sub-text',
      {
        opacity: 0,
        x: -30
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        ease: 'expo.out',
        duration: 0.6
      },
      'textsDisappear+=0.1'
    )
    .fromTo(
      '#first-track-ref',
      {
        width: '0%'
      },
      {
        width: '100%',
        ease: 'expo.inOut',
        duration: 1,
        onUpdate: () => {
          interpolateBetweenReferenceElements(
            document.querySelector('#year-splash-track-ref')!,
            document.querySelector('#first-track-ref')!,
            document.querySelector('#fst-track-image')!,
            1
          )
        },
        onComplete: () => {
          interpolateBetweenReferenceElements(
            document.querySelector('#year-splash-track-ref')!,
            document.querySelector('#first-track-ref')!,
            document.querySelector('#fst-track-image')!,
            1
          )
        }
      },
      'textsDisappear'
    )
    .fromTo(
      '#fst-track-image',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.1
      },
      '0.9'
    )
}
