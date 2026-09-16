import gsap from 'gsap'
import {
  includeTopSceneBackwardTimeline,
  includeTopSceneForwardTimeline
} from '../../modules/topSceneTimeline'

export function createCollageSceneTimelineForward() {
  const tl = gsap.timeline({
    paused: true,
    data: {
      id: 'clg-forward'
    }
  })

  includeTopSceneBackwardTimeline(tl, 'tal', '0')

  tl.fromTo(
    '#clg h2',
    {
      opacity: 0,
      x: -20
    },
    {
      opacity: 1,
      x: 0,
      duration: 1
    }
  )
    .fromTo(
      '#clg #collage-image',
      {
        opacity: 0,
        x: 20
      },
      {
        opacity: 1,
        x: 0,
        duration: 1
      },
      '-=0.5'
    )
    .fromTo(
      '#clg button',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1
      },
      '-=0.5'
    )

  return tl
}

export function createCollageSceneTimelineBackward() {
  const tl = gsap.timeline({
    paused: true,
    data: {
      id: 'clg-backward'
    }
  })

  tl.fromTo(
    '#clg h2, #collage-image, #clg button',
    {
      opacity: 1
    },
    {
      opacity: 0
    }
  )

  includeTopSceneForwardTimeline(tl, 'tal', '+=0.2')

  return tl
}
