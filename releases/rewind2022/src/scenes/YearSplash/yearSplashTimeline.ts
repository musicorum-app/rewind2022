import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { stagger, timeline } from 'motion'
import { Easings } from '../../modules/easings'
import { Gradient, Palettes } from '../../theme/colors'

gsap.registerPlugin(CustomEase)

function gradientToCss(gradient: Gradient) {
  return `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`
}

export const yearSplashForwardTimeline = (targetGradient: Gradient) =>
  gsap
    .timeline({
      paused: true
    })
    .fromTo(
      'body',
      {
        background: gradientToCss(Palettes.MidnightSky.gradient)
      },
      {
        background: gradientToCss(targetGradient),
        duration: 1
      }
    )
    .fromTo(
      '#ysp .main-year',
      {
        scale: 0.5,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'circ.out',
        duration: 0.7
      },
      '0.1'
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
      '0'
    )
    .add('backImages', 'yearIntro')
    .fromTo(
      '#ysp .back-image-1',
      {
        opacity: 0,
        y: -124
      },
      {
        opacity: 1,
        y: '-=20'
      },
      'backImages+=0.2'
    )
    .fromTo(
      '#ysp .back-image-2',
      {
        opacity: 0,
        x: -260
      },
      {
        opacity: 1,
        x: '+=20'
      },
      'backImages+=0.4'
    )
    .fromTo(
      '#ysp .back-image-3',
      {
        opacity: 0,
        y: -25
      },
      {
        opacity: 1,
        y: '-=20'
      },
      'backImages+=0.6'
    )
    .fromTo(
      '#ysp .back-image-5',
      {
        opacity: 0,
        x: 280
      },
      {
        opacity: 1,
        x: '+=20'
      },
      'backImages+=0.8'
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
