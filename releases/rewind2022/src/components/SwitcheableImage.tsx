import styled from '@emotion/styled'
import { clamp } from '@rewind/core/src/utils'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { mapValueBetweenRanges } from '../utils/math'

const Container = styled.div`
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 2000px;
`

const Image = styled.img`
  border-radius: 12px;
  box-sizing: border-box;
  object-fit: cover;

  &:not(:first-of-type) {
    position: absolute;
    top: 0;
    left: 0;
  }

  &:first-of-type {
    box-shadow: 0px 4px 70px #000000cc;
    transform: translateZ(-3px);
  }
`

export default function SwitcheableImage<
  C extends Record<string, string>
>(props: {
  choices: C
  choice: keyof C
  onTransitionChange: (value: boolean) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prevChoiceRef = useRef<keyof C>(props.choice)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const images = containerRef.current.querySelectorAll<HTMLImageElement>(
      'img:not(:first-of-type)'
    )

    for (const image of images) {
      const choice = image.getAttribute('data-choice')
      if (choice === prevChoiceRef.current) {
        image.style.transform = 'translateZ(1px)'
        interpolateMask(image, 0)
        props.onTransitionChange(true)

        const obj = {
          value: 0
        }
        gsap.to(obj, {
          value: 1,
          duration: 0.3,
          onUpdate: () => {
            interpolateMask(image, obj.value)
          },
          onComplete: () => {
            image.style.transform = 'translateZ(-1px)'
            image.style.maskImage = 'none'
            image.style.webkitMaskImage = 'none'
            props.onTransitionChange(false)
          }
        })
      } else if (choice === props.choice) {
        image.style.transform = 'translateZ(0px)'
      } else {
        image.style.transform = 'translateZ(-2px)'
      }
    }
  }, [props.choice, containerRef])

  useEffect(() => {
    prevChoiceRef.current = props.choice
  }, [props.choice])

  return (
    <Container ref={containerRef}>
      <Image src={Object.values(props.choices)[0]} />
      {Object.entries(props.choices).map(([choice, url]) => (
        <Image key={choice} data-choice={choice} src={url} />
      ))}
    </Container>
  )
}

function interpolateMask(element: HTMLElement, value: number) {
  const percent = mapValueBetweenRanges([0, 1], [50, 0], value) + '%'
  const px =
    clamp(mapValueBetweenRanges([0.7, 1], [80, 0], value), 0, 80) + 'px'

  const alpha =
    clamp(mapValueBetweenRanges([0.8, 1], [100, 60], value), 60, 100) + '%'

  const maskValue = `linear-gradient(
    transparent calc(50% - ${px} - ${percent}),
    rgb(0 0 0 / ${alpha}) calc(50% - ${percent}),
    rgb(0 0 0 / ${alpha}) calc(50% + ${percent}),
    transparent calc(50% + ${px} + ${percent})
  )`

  element.style.maskImage = maskValue
  element.style.webkitMaskImage = maskValue
}
