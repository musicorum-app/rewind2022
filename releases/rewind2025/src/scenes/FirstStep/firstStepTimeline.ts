import gsap from 'gsap'

export const firstStepForwardTimeline = () =>
  gsap
    .timeline({
      paused: true,
      data: {
        id: 'fst-forward'
      }
    })
    .fromTo(
      '#ysp .main-year',
      {
        '--percent': '100%'
      },
      {
        '--percent': '0%',
        duration: 0.7,
        ease: 'power2.inOut'
      },
      '0'
    )
    .fromTo(
      '#ysp .bottom-text',
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut'
      },
      '0'
    )
    .add('image-appear', 0.8)
    .fromTo(
      '#fst .track-image',
      {
        '--image-container-clip-percent': '100%'
      },
      {
        '--image-container-clip-percent': '0%',
        duration: 0.5,
        ease: 'power2.out'
      },
      'image-appear'
    )
    .fromTo(
      '#fst .track-image',
      {
        '--image-container-image-clip-percent': '100%'
      },
      {
        '--image-container-image-clip-percent': '0%',
        duration: 0.5,
        ease: 'power2.out'
      },
      '-=0.1'
    )
    .add('textsAppear', '1')
    .fromTo(
      '#fst .first-one',
      {
        opacity: 0,
        y: -20
      },
      {
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        duration: 1.3
      },
      'textsAppear'
    )
    .fromTo(
      '#fst .track-name',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        duration: 1.3
      },
      'textsAppear+=0.2'
    )
    .fromTo(
      '#fst .sub-text',
      {
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0,
        ease: 'expo.out',
        duration: 1.3
      },
      'textsAppear+=0.2'
    )

export const firstStepBackwardTimeline = () =>
  gsap
    .timeline({
      paused: true,
      data: {
        id: 'fst-backward'
      }
    })
    .fromTo(
      '#ysp .digit',
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.1,
        ease: 'circ.out'
      },
      '0.7'
    )
    .fromTo(
      '#fst .track-image',
      {
        '--image-container-clip-percent': '0%',
        '--image-container-image-clip-percent': '0%'
      },
      {
        '--image-container-clip-percent': '100%',
        '--image-container-image-clip-percent': '100%',
        duration: 0.5,
        ease: 'power2.in'
      },
      '0.3'
    )
    .add('textsDisappear', '0')
    .fromTo(
      '#fst .first-one',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -20,
        ease: 'expo.in',
        duration: 0.6
      },
      'textsDisappear'
    )
    .fromTo(
      '#fst .track-name',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: 50,
        ease: 'expo.in',
        duration: 0.6
      },
      'textsDisappear+=0.1'
    )
    .fromTo(
      '#fst .sub-text',
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -50,
        ease: 'expo.in',
        duration: 0.6
      },
      'textsDisappear+=0.1'
    )
    .fromTo(
      '#ysp .bottom-text',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.inOut'
      }
    )
    .fromTo(
      '#ysp .main-year',
      {
        '--percent': '0%'
      },
      {
        '--percent': '100%',
        duration: 0.7,
        ease: 'power2.inOut'
      },
      '-=0.2'
    )
