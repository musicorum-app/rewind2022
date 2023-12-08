import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { stagger, timeline } from 'motion'
import { Easings } from '../../modules/easings'
import { interpolateBetweenReferenceElements } from '../../modules/referenceInterpolator'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

gsap.registerPlugin(CustomEase)

export const yearSplashForwardTimeline = (backgroundColor: string) =>
  gsap
    .timeline({
      paused: true
    })
    .add('start', '2')
    .set('#ysp', {
      '--from-color': Palettes.Candy.darkerColor,
      '--to-color': Palettes.Gold.darkerColor
    })
    .fromTo(
      '#ysp',
      {
        '--percent': '0%'
      },
      {
        '--percent': '100%',
        duration: 0.5
      },
      'start'
    )
    .set('#ysp', {
      '--from-color': Palettes.Gold.darkerColor,
      '--to-color': Palettes.Sky.darkerColor
    })
    .fromTo(
      '#ysp',
      {
        '--percent': '0%'
      },
      {
        // '--from-color': Palettes.Gold.darkerColor,
        // '--to-color': Palettes.Sky.darkerColor,
        '--percent': '100%',
        duration: 0.5
      }
    )
    .set('#ysp', {
      '--from-color': Palettes.Sky.darkerColor,
      '--to-color': backgroundColor
    })
    .fromTo(
      '#ysp',
      {
        // '--from-color': Palettes.Sky.darkerColor,
        // '--to-color': backgroundColor,
        '--percent': '0%'
      },
      {
        // '--from-color': Palettes.Sky.darkerColor,
        // '--to-color': backgroundColor,
        '--percent': '100%',
        duration: 0.5
      }
    )
    .fromTo(
      '#ysp .main-year',
      {
        scale: 0.5,
        opacity: 0,
        '--percent': '0%'
      },
      {
        scale: 1,
        opacity: 1,
        '--percent': '100%',
        ease: 'power2.out',
        duration: 0.7
      },
      '-=0.3'
    )
    .add('yearIntro')

    .fromTo(
      '#ysp .digit',
      {
        '--weight': 300
      },
      {
        '--weight': 900,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power1.inOut'
      },
      '-=1'
    )

    .fromTo(
      '#ysp .bottom-text',
      {
        opacity: 0
      },
      {
        opacity: 1
      },
      '+=0.4'
    )

//  gsap.timeline([
//   [
//     '#root',
//     {
//       '--gradient-1': [Palettes.MidnightSky.gradient[0], targetGradient[0]],
//       '--gradient-2': [Palettes.MidnightSky.gradient[1], targetGradient[1]]
//     },
//     {
//       at: 0,
//       duration: 1,
//       easing: 'linear'
//     }
//   ],
//   [
//     '#ysp .main-year',
//     {
//       transform: ['scale(0.1)', 'scale(1)'],
//       opacity: [0, 1]
//     },
//     {
//       at: 0,
//       duration: 1.8,
//       easing: Easings.easeOutExpo
//     }
//   ],
//   [
//     '#ysp .digit',
//     {
//       fontVariationSettings: ['"wght" 400', '"wght" 900']
//     },
//     {
//       at: 0.15,
//       delay: stagger(0.15),
//       duration: 0.2,
//       easing: 'linear'
//     }
//   ]
//   // [
//   //   'back-'
//   // ]
// ])
