import gsap from 'gsap'
import {
  includeTopSceneBackwardTimeline,
  includeTopSceneForwardTimeline
} from '../../modules/topSceneTimeline'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createTopArtistsTimelineForward(targetGradient: Gradient) {
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'tar-forward'
      }
    })
    .fromTo(
      '#scd',
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.5
      }
    )
    .fromTo(
      'body',
      {
        background: gradientToCss(Palettes.DisplacedOcean.gradient)
      },
      {
        background: gradientToCss(targetGradient),
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneForwardTimeline(tl, 'tar', '0.5')

  return tl
}

export function createTopArtistsTimelineBackward(targetGradient: Gradient) {
  const tl = gsap
    .timeline({
      paused: true,
      data: {
        id: 'tar-backward'
      }
    })
    .fromTo(
      'body',
      {
        background: gradientToCss(targetGradient)
      },
      {
        background: gradientToCss(Palettes.DisplacedOcean.gradient),
        duration: 0.8,
        ease: 'linear'
      }
    )
    .fromTo(
      '#scd',
      {
        opacity: 0,
        scale: 0.9
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5
      },
      '0.6'
    )

  includeTopSceneBackwardTimeline(tl, 'tar', '0')

  return tl
}
