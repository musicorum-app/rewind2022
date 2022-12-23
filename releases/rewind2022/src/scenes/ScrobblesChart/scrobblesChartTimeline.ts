import gsap from 'gsap'

export function createScrobblesChartTimeline() {
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
          amount: 0.2
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
          amount: 0.2,
          from: 'end'
        }
      },
      'chart'
    )
}
