import { mapValueAndClamp } from '@rewind/core/src/utils'
import gsap from 'gsap'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'
import { lastBackground } from '../Share/shareTimeline'

const obj = {
  value: 0
}

export function createTagTimelineForward(gradient: Gradient) {
  const element = document.querySelector<HTMLElement>('#tag canvas')!
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'tag-forward'
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
      'body',
      {
        background: gradientToCss(gradient)
      },
      {
        background: gradientToCss(Palettes.MidnightSky.gradient),
        duration: 0.8,
        ease: 'linear'
      },
      '0.3'
    )
    .fromTo(
      '#tag h2',
      {
        opacity: 0
      },
      {
        opacity: 1
      },
      '0.8'
    )
    .fromTo(
      obj,
      {
        value: 0
      },
      {
        value: 1,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          updateTagMask(element, obj.value)
        }
      },
      '-=0.5'
    )

  return tl
}

export function createTagTimelineBackward(gradient: Gradient) {
  const element = document.querySelector<HTMLElement>('#tag canvas')!
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'tag-backward'
      }
    })
    .fromTo(
      obj,
      {
        value: 1
      },
      {
        value: 0,
        duration: 1,
        ease: 'power2.in',
        onUpdate: () => {
          updateTagMask(element, obj.value)
        }
      }
    )
    .fromTo(
      '#tag h2',
      {
        opacity: 1
      },
      {
        opacity: 0
      },
      '1'
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
      'body',
      {
        background: gradientToCss(Palettes.MidnightSky.gradient)
      },
      {
        background: gradientToCss(gradient),
        duration: 0.8,
        ease: 'linear'
      },
      '-=1'
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

  return tl
}

function updateTagMask(element: HTMLElement, value: number) {
  const centerPercent = mapValueAndClamp(value, [0.2, 1], [0, 100])
  const borderPercent = mapValueAndClamp(value, [0, 1], [0, 120])
  const mask = `radial-gradient(circle, black ${centerPercent}%, transparent ${borderPercent}%)`

  element.style.maskImage = mask
  element.style.webkitMaskImage = mask
}
