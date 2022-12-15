import styled from '@emotion/styled'
import { clamp, mapValue, mapValueAndClamp } from '@rewind/core/src/utils'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

const Container = styled.div`
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 3000px;
  pointer-events: none;
`

const Image = styled.img`
  border-radius: 8px;
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
        image.style.opacity = '1'
        image.style.transform = 'translateZ(1px)'
        interpolateMask(image, 0)
        props.onTransitionChange(true)

        const obj = {
          value: 1
        }
        gsap.to(obj, {
          value: 0,
          duration: 0.5,
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
        image.style.opacity = '1'
        image.style.transform = 'translateZ(0px)'
      } else {
        image.style.opacity = '0'
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
  const percent = mapValue(value, [0, 1], [50, 0]) + '%'
  const px = mapValueAndClamp(value, [1, 0.8], [0, 100]) + 'px'
  const alpha = clamp(mapValue(value, [1, 0.9], [1, 0]), 0, 1)

  const maskValue = `linear-gradient(
    black calc(50% - ${px} - ${percent}),
    rgba(0, 0, 0, ${alpha}) calc(50% - ${percent}),
    rgba(0, 0, 0, ${alpha}) calc(50% + ${percent}),
    black calc(50% + ${px} + ${percent})
  )`

  element.style.maskImage = maskValue
  element.style.webkitMaskImage = maskValue
}
