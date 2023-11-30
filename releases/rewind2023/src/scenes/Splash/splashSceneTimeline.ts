import gsap from 'gsap'
import { Palettes } from '../../theme/colors'
import CustomEase from 'gsap/CustomEase'

const ease = CustomEase.create(
  'custom',
  'M0,0 C0.126,0.382 0.226,0.582 0.384,0.73 0.576,0.91 0.818,1.001 1,1 '
)

export function createSplashSceneTimeline() {
  return gsap
    .timeline({
      paused: true
    })
    .set('#preload', { display: 'flex' })
    .set('#root', { display: 'none' })
    .set('#rewind-overlay, #splash-musicorum-presents', { opacity: 0 })
    .fromTo(
      '#preload',
      {
        opacity: 1,
        display: 'flex'
      },
      {
        opacity: 0,
        display: 'none'
      }
    )
    .set('#preload', { display: 'none' })
    .set('#root', { display: 'flex' })
    .fromTo(
      '#root',
      {
        opacity: 0,
        display: 'none'
      },
      {
        opacity: 1,
        display: 'flex'
      }
    )
    .fromTo('#splash-powered-by', { opacity: 1 }, { opacity: 0 }, '=+1')
    .fromTo('#splash-musicorum-presents', { opacity: 0 }, { opacity: 1 })
    .fromTo('#splash-musicorum-presents', { opacity: 1 }, { opacity: 0 }, '=+1')

    .set('#splash-rewind-text', { '--left-pos': 'auto' })
    .fromTo(
      '#splash-rewind-text',
      {
        '--scale': 22,
        '--right-pos': '-2070px',
        '--left-pos': 'auto'
      },
      {
        '--right-pos': '-800px',
        '--left-pos': 'auto',
        duration: 0.6,
        ease
      }
    )
    .set('#splash-rewind-text', { '--right-pos': 'auto' })
    .fromTo(
      '#splash-rewind-text',
      {
        '--scale': 22,
        '--left-pos': '-1780px'
      },
      {
        '--left-pos': '-480px',
        '--scale': 22,
        duration: 0.6,
        ease
      }
    )
    .fromTo(
      '#splash-rewind-text',
      {
        '--scale': 2,
        '--left-pos': 'auto'
      },
      {
        '--scale': 4.5,
        '--left-pos': 'auto',
        duration: 1.4,
        ease: 'power4.out'
      }
    )

    .fromTo(
      document.body,
      { background: Palettes.Sky.darkerColor },
      { background: Palettes.Candy.darkerColor },
      '-=1.3 '
    )
    .fromTo(
      '#rewind-overlay',
      {
        opacity: 0,
        display: 'none'
      },
      {
        opacity: 1,
        display: 'unset'
      },
      '+=0.6 '
    )
}
