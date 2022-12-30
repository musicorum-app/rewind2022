import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { stagger, timeline } from 'motion'
import { Easings } from '../../modules/easings'
import { interpolateBetweenReferenceElements } from '../../modules/referenceInterpolator'
import { Gradient, Palettes } from '../../theme/colors'
import { gradientToCss } from '../../utils/style'

gsap.registerPlugin(CustomEase)

export const yearSplashForwardTimeline = (targetGradient: Gradient) =>
  gsap
    .timeline({
      paused: true
    })
    .add('start', '2')
    .fromTo(
      'body',
      {
        background: gradientToCss(Palettes.MidnightSky.gradient)
      },
      {
        background: gradientToCss(targetGradient),
        duration: 1
      },
      'start'
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
      'start+=0.1'
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
      'start'
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
      '#year-splash-track-ref',
      {
        y: -70
      },
      {
        y: '+=20',
        onUpdate: () => {
          interpolateBetweenReferenceElements(
            document.querySelector('#year-splash-track-ref')!,
            document.querySelector('#first-track-ref')!,
            document.querySelector('#fst-track-image')!,
            0
          )
        }
      },
      'backImages+=0.8'
    )
    .fromTo(
      '#fst-track-image',
      {
        opacity: 0
      },
      {
        opacity: 1
      },
      'backImages+=0.8'
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
      'backImages+=1 '
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
