import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { FiPlay, FiPause, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IconButton } from './IconButton'
import Indicator from './Indicator'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const LineSegment = styled.div`
  flex: 1;
  margin-left: 20px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`

const Line = styled.hr`
  border: 2px solid var(--border);
  border-radius: 5px;
  margin: 0;
  width: 100%;
`

interface TimelineProps {
  timeline: gsap.core.Timeline
  canNavigate?: boolean
  prev?: () => void
  next?: () => void
}

export default function Timeline({
  timeline,
  canNavigate,
  prev,
  next
}: TimelineProps) {
  const [isPlaying, setIsPlaying] = useState(!timeline.paused())
  const [progress, setProgress] = useState(timeline.progress())
  const lineRef = useRef<HTMLHRElement>(null)
  const lineSegmentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    timeline.eventCallback('onUpdate', () => {
      setIsPlaying(timeline.isActive() ? !timeline.paused() : false)
      setProgress(timeline.progress())
    })

    return () => {
      timeline.eventCallback('onUpdate', null)
      timeline.eventCallback('onInterrupt', null)
    }
  }, [timeline])

  const handleControlClick = () => {
    if (isPlaying) {
      timeline.pause()
      setIsPlaying(false)
    } else if (timeline.progress() === 1) {
      timeline.play(0)
    } else {
      timeline.play()
    }
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        if (timeline.isActive() && !timeline.paused()) {
          timeline.pause()
          setIsPlaying(false)
        } else if (timeline.progress() === 1) {
          timeline.play(0)
        } else {
          timeline.play()
        }
      } else if (event.key === 'Home') {
        timeline.progress(0)
      } else if (event.key === 'End') {
        timeline.progress(1)
      }
    }

    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [timeline])

  return (
    <Wrapper>
      <IconButton disabled={!canNavigate} onClick={prev}>
        <FiChevronLeft />
      </IconButton>
      <IconButton onClick={handleControlClick}>
        {isPlaying ? <FiPause /> : <FiPlay />}
      </IconButton>
      <IconButton disabled={!canNavigate} onClick={next}>
        <FiChevronRight />
      </IconButton>

      <LineSegment ref={lineSegmentRef}>
        <Indicator
          onProgressChange={(v) => setProgress(v)}
          lineRef={lineRef}
          lineSegmentRef={lineSegmentRef}
          progress={progress}
          timeline={timeline}
        />
        <Line ref={lineRef} />
      </LineSegment>
    </Wrapper>
  )
}
