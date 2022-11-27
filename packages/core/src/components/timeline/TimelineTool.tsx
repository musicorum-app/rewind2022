import { useState } from 'react'
import { Box } from './Box'
import { Container } from './Container'
import Puller from './Puller'
import Timeline from './Timeline'

export interface TimelineToolProps {
  timeline?: gsap.core.Timeline | null
  canNavigate?: boolean
  prev?: () => void
  next?: () => void
}

export default function TimelineTool(props: TimelineToolProps) {
  const [opened, setOpened] = useState(false)

  return (
    <Container>
      <Box opened={opened}>
        {props.timeline ? (
          <Timeline {...props} timeline={props.timeline} canNavigate />
        ) : (
          'No timeline active'
        )}
      </Box>
      <Puller onClick={() => setOpened((v) => !v)} opened={opened} />
    </Container>
  )
}
