import gsap from 'gsap'
import {
  includeTopSceneBackwardTimeline,
  includeTopSceneForwardTimeline
} from '../../modules/topSceneTimeline'
import { Gradient } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createTopAlbumsTimelineForward(
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

  includeTopSceneBackwardTimeline(tl, 'ttr', '0')

  includeTopSceneForwardTimeline(tl, 'tal', '1')

  return tl
}

export function createTopAlbumsTimelineBackward(
  originTarget: Gradient,
  targetGradient: Gradient
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
        background: gradientToCss(targetGradient)
      },
      {
        background: gradientToCss(originTarget),
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneBackwardTimeline(tl, 'tal', '0')

  includeTopSceneForwardTimeline(tl, 'ttr', '1')

  return tl
}
