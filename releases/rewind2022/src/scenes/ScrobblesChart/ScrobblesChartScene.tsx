import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect } from 'react'
import { RewindScene } from '../../types'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import { Chart } from './Chart'
import {
  createScrobblesChartTimelineBackward,
  createScrobblesChartTimelineForward
} from './scrobblesChartTimeline'

const Digit = styled.span`
  font-size: 0.7em;
  font-variation-settings: 'wght' 900;
  margin: 0;
  line-height: 0.7em;
  width: 60px;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 700px) {
    width: 40px;
  }

  @media only screen and (max-width: 460px) {
    width: 30px;
  }
`

const CountContainer = styled.div`
  position: absolute;
  top: 100px;
  font-size: 182px;
  @media only screen and (max-width: 1030px) {
    top: 60px;
  }
  @media only screen and (max-height: 700px) {
    top: 60px;
  }

  @media only screen and (max-width: 700px) {
    font-size: 120px;
  }

  @media only screen and (max-width: 460px) {
    font-size: 90px;
  }
  opacity: 0;
`

const CountCopy = styled(Digit)`
  display: flex;
  width: auto !important;
`

const ComplementaryText = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 1rem;
  text-align: center;
`

export default function ScrobblesChartScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  if (!rewindData) {
    return null
  }

  useEffect(() => {
    setTimelines(RewindScene.ScrobblesChartScene, {
      forward: {
        id: 'scc-forward',
        factory: createScrobblesChartTimelineForward
      },
      backward: {
        id: 'scc-backward',
        factory: createScrobblesChartTimelineBackward
      }
    })
  }, [])

  return (
    <Centered column id="scc">
      <CountContainer className="info">
        <CountCopy>
          {rewindData.scrobbles.total
            .toString()
            .split('')
            .map((d) => (
              <Digit>{d}</Digit>
            ))}
        </CountCopy>
        <ComplementaryText>scrobbles this year</ComplementaryText>
      </CountContainer>
      <Chart rewindData={rewindData} />
    </Centered>
  )
}
