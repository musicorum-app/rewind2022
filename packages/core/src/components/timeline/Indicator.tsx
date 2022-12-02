import styled from '@emotion/styled'
import { RefObject, useEffect, useState } from 'react'
import { clamp, mapValue } from '../../utils'

const IndicatorWrapper = styled.div<{ progress: number }>`
  position: absolute;
  left: ${(p) => p.progress * 100}%;

  transform: translateY(calc(-50% + 16px)) translateX(-50%);
  cursor: pointer;
`

interface IndicatorProps {
  progress: number
  onProgressChange: (value: number) => void
  timeline: gsap.core.Timeline
  lineRef: RefObject<HTMLHRElement>
  lineSegmentRef: RefObject<HTMLDivElement>
}

export default function Indicator({
  progress,
  timeline,
  lineRef,
  lineSegmentRef,
  onProgressChange: setProgress
}: IndicatorProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [mouseX, setMouseX] = useState(0)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  useEffect(() => {
    const mouseMoveListener = (event: MouseEvent) => {
      setMouseX(event.pageX)
    }
    const mouseUpListener = () => {
      setIsDragging(false)
    }
    document.addEventListener('mousemove', mouseMoveListener)
    document.addEventListener('mouseup', mouseUpListener)

    return () => {
      document.removeEventListener('mousemove', mouseMoveListener)
      document.removeEventListener('mouseup', mouseUpListener)
    }
  }, [timeline])

  useEffect(() => {
    const element = lineSegmentRef.current
    if (element) {
      const listener = (event: MouseEvent) => {
        setIsDragging(true)
        setMouseX(event.pageX)
      }
      element.addEventListener('mousedown', listener)

      return () => {
        element.removeEventListener('mousedown', listener)
      }
    }
  }, [lineSegmentRef, timeline])

  useEffect(() => {
    if (isDragging && lineRef.current) {
      const lineBounding = lineRef.current.getBoundingClientRect()
      const lineStart = lineBounding.x
      const lineEnd = lineBounding.x + lineBounding.width
      const value = clamp(mapValue(mouseX, [lineStart, lineEnd], [0, 1]), 0, 1)

      timeline.pause()
      timeline.seek(timeline.totalDuration() * value, false)
      setProgress(value)
    }
  }, [isDragging, mouseX, lineRef])

  return (
    <IndicatorWrapper progress={progress} onMouseDown={handleDragStart}>
      <svg
        width="11"
        height="24"
        viewBox="0 0 11 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 5.54796C0 4.9568 0.261528 4.39592 0.71437 4.01591L4.21437 1.07885C4.9579 0.454907 6.0421 0.454907 6.78563 1.07885L10.2856 4.01591C10.7385 4.39592 11 4.9568 11 5.54796V18.452C11 19.0432 10.7385 19.6041 10.2856 19.9841L6.78563 22.9211C6.0421 23.5451 4.9579 23.5451 4.21437 22.9211L0.714369 19.9841C0.261527 19.6041 0 19.0432 0 18.452V5.54796Z"
          fill="var(--color)"
        />
      </svg>
    </IndicatorWrapper>
  )
}
