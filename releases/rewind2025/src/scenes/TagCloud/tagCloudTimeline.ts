import { mapValueAndClamp } from '@rewind/core/src/utils'
import gsap from 'gsap'
import { Gradient, Palette, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'
import { lastArtistShareBackground } from '../ArtistShare/artistShareTimeline'

const obj = {
  value: 0
}

export function createTagTimelineForward(
  backwardPalette: Palette,
  palette: Palette
) {
  const element = document.querySelector<HTMLElement>('#tag canvas')!
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'tag-forward'
      }
    })
    .fromTo(
      '#asr .text',
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
      '#asr .image-share',
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
        background: lastArtistShareBackground.value.darkerColor
      },
      {
        background: palette.darkerColor,
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

export function createTagTimelineBackward(
  backwardPalette: Palette,
  palette: Palette
) {
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
      '#asr .text',
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
      '#asr .image-share',
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
    .fromTo(
      'body',
      {
        background: palette.darkerColor
      },
      {
        background: lastArtistShareBackground.value.darkerColor,
        duration: 0.8,
        ease: 'linear'
      },
      '-=1'
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
