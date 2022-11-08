import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useEffect } from 'react'
import { firstStepObjects } from './firstStepSheet'
import { Palettes } from '../../theme/colors'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { useMainControllerObjectObserver } from '../../modules/sheets'
import styled from '@emotion/styled'

const TrackImageRef = styled.div`
  position: absolute;
  right: var(--margin);
  bottom: var(--margin);
  width: 35vw;
  height: 35vw;
`

export default function FirstStepScene() {
  const rewindData = useRewindData()

  const { pointerEvents } = useMainControllerObjectObserver(
    firstStepObjects.mainObject,
    Palettes.MidnightSky.gradient,
    Palettes.MidnightSky.gradient
  )

  if (!rewindData) return null

  return (
    <Centered
      style={{
        pointerEvents: pointerEvents ? 'unset' : 'none'
      }}
    >
      {/*
      <h2>{rewindData.firstScrobble.name}</h2> */}
    </Centered>
  )
}
