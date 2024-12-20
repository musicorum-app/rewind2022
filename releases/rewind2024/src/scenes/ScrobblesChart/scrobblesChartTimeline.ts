import gsap from 'gsap'

export function createScrobblesChartTimelineForward() {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'scc-forward'
      }
    })
    .fromTo(
      '#scr',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.5
      }
    )
    .fromTo(
      '#scc .info',
      {
        y: 10,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5
      }
    )
    .fromTo(
      '#scc .chart',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.1
      }
    )
    .fromTo(
      '#scc .max-value',
      {
        x: -16,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1
      }
    )
    .add('chart', '1.3')
    .fromTo(
      '#scc .line',
      {
        opacity: 0
      },
      {
        opacity: 1,
        stagger: {
          amount: 0.4
        }
      },
      'chart'
    )
    .fromTo(
      '#scc .month-name',
      {
        opacity: 0
      },
      {
        opacity: 1,
        stagger: {
          amount: 0.4,
          from: 'end'
        }
      },
      'chart'
    )
    .fromTo(
      '#scc .chart svg circle',
      {
        r: 10,
        opacity: 0
      },
      {
        r: 4,
        opacity: 1,
        duration: 1,
        stagger: 0.1
      },
      'chart+=0.2'
    )
    .fromTo(
      '#scc .chart svg polyline',
      {
        attr: {
          'stroke-dashoffset': 1
        }
      },
      {
        attr: {
          'stroke-dashoffset': 0
        },
        duration: 2
      },
      'chart+=0.4'
    )
}

export function createScrobblesChartTimelineBackward() {
  return gsap
    .timeline({
      paused: true,
      data: {
        id: 'scc-backward'
      }
    })
    .fromTo(
      '#scc .info',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.5
      }
    )
    .fromTo(
      '#scc .chart',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.5
      },
      '-=0.2'
    )
    .fromTo(
      '#scr',
      {
        opacity: 0,
        scale: 0.96
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5
      }
    )
}
