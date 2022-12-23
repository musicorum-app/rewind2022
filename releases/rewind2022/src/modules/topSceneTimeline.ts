export function includeTopSceneForwardTimeline(
  timeline: gsap.core.Timeline,
  id: string,
  at: string
) {
  timeline
    .add('forward', at)
    .fromTo(
      `#${id} .top-item`,
      {
        opacity: 0,
        scale: 0.9,
        y: 60
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.09
      },
      'forward'
    )
    .fromTo(
      `#${id} .top-item h2`,
      {
        opacity: 0,
        y: 10
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08
      },
      'forward+=0.2'
    )
    .fromTo(
      `#${id} .top-item h5`,
      {
        opacity: 0,
        y: -10
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08
      },
      'forward+=0.4'
    )
    .fromTo(
      `#${id} .text`,
      {
        opacity: 0,
        y: 10
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3
      },
      'forward+=0.4'
    )
}

export function includeTopSceneBackwardTimeline(
  timeline: gsap.core.Timeline,
  id: string,
  at: string
) {
  timeline
    .add('backward', at)
    .fromTo(
      `#${id} .top-item`,
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 0.9,
        stagger: 0.06
      },
      'backward'
    )
    .fromTo(
      `#${id} .text`,
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -10,
        stagger: 0.3
      },
      'backward+=0.4'
    )
}
