import gsap from 'gsap'
import {
  includeTopSceneBackwardTimeline,
  includeTopSceneForwardTimeline
} from '../../modules/topSceneTimeline'
import { Gradient } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createTopTracksTimelineForward(
  originTarget: Gradient,
  targetGradient: Gradient
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
        background: gradientToCss(originTarget)
      },
      {
        background: gradientToCss(targetGradient),
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneBackwardTimeline(tl, 'tar', '0')

  includeTopSceneForwardTimeline(tl, 'ttr', '1')

  return tl
}

export function createTopTracksTimelineBackward(
  originTarget: Gradient,
  targetGradient: Gradient
) {
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'ttr-backward'
      }
    })
    .fromTo(
      'body',
      {
        background: gradientToCss(targetGradient)
      },
      {
        background: gradientToCss(originTarget),
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneBackwardTimeline(tl, 'ttr', '0')

  includeTopSceneForwardTimeline(tl, 'tar', '1')

  return tl
}
