import gsap from 'gsap'
import {
  includeTopSceneBackwardTimeline,
  includeTopSceneForwardTimeline
} from '../../modules/topSceneTimeline'
import { Gradient, Palette } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createTopAlbumsTimelineForward(
  originPalette: Palette,
  targetPalette: Palette
) {
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'ttr-forward'
      }
    })
    .fromTo(
      'body',
      {
        background: originPalette.darkerColor
      },
      {
        background: targetPalette.darkerColor,
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneBackwardTimeline(tl, 'ttr', '0')

  includeTopSceneForwardTimeline(tl, 'tal', '1')

  return tl
}

export function createTopAlbumsTimelineBackward(
  originPalette: Palette,
  targetPalette: Palette
) {
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'tal-backward'
      }
    })
    .fromTo(
      'body',
      {
        background: targetPalette.darkerColor
      },
      {
        background: originPalette.darkerColor,
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneBackwardTimeline(tl, 'tal', '0')

  includeTopSceneForwardTimeline(tl, 'ttr', '1')

  return tl
}
