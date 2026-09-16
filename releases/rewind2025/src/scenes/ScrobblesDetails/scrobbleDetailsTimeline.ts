import gsap from 'gsap'

export function createScrobblesDetailsTimelineForward() {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'scd-forward'
      }
    })
    .fromTo(
      '#scd .info',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.001
      }
    )
    .fromTo(
      '#scc .info',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.001
      },
      '0'
    )
    .fromTo(
      '#scc .month-name, #scc .line',
      {
        opacity: 1
      },
      {
        opacity: 0,
        stagger: {
          amount: 0.5
        }
      },
      '0'
    )
    .fromTo(
      '#scc .chart',
      {
        opacity: 1
      },
      {
        opacity: 0
      },
      '0.3'
    )
    .fromTo(
      '#scd .label',
      {
        opacity: 0,
        y: -18
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }
    )
    .fromTo(
      '#scd .details',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.1
      },
      '0.6'
    )
    .fromTo(
      '#scd .details > div',
      {
        opacity: 0,
        y: -22,
        scale: 1.1
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1
      },
      '0.6'
    )
}

export function createScrobblesDetailsTimelineBackward() {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'scd-backward'
      }
    })
    .fromTo(
      '#scd .label',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -18,
        ease: 'power2.in'
      }
    )
    .fromTo(
      '#scd .details > div',
      {
        opacity: 1,
        y: 0,
        scale: 1
      },
      {
        opacity: 0,
        y: -20,
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.in',
        stagger: 0.1
      },
      '0.1'
    )
    .fromTo(
      '#scd .info',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.001
      },
      '1'
    )
    .fromTo(
      '#scc .info',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.001
      },
      '1'
    )
    .fromTo(
      '#scc .month-name, #scc .line',
      {
        opacity: 0
      },
      {
        opacity: 1,
        stagger: {
          amount: 0.5
        }
      },
      '0.7'
    )
    .fromTo(
      '#scc .chart',
      {
        opacity: 0
      },
      {
        opacity: 1
      },
      '0.7'
    )
}
