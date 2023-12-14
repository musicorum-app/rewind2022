import gsap from 'gsap'
import {
  includeTopSceneBackwardTimeline,
  includeTopSceneForwardTimeline
} from '../../modules/topSceneTimeline'
import { Gradient, Palette, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

export function createTopArtistsTimelineForward(targetPalette: Palette) {
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
        background: Palettes.Candy.darkerColor
      },
      {
        background: targetPalette.darkerColor,
        duration: 0.8,
        ease: 'linear'
      },
      '0.4'
    )

  includeTopSceneForwardTimeline(tl, 'tar', '0.5')

  return tl
}

export function createTopArtistsTimelineBackward(targetPalette: Palette) {
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
        background: targetPalette.darkerColor
      },
      {
        background: Palettes.Candy.darkerColor,
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
