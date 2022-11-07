import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useEffect } from 'react'
import { firstStepObjects } from './firstStepSheet'
import { Palettes } from '../../theme/colors'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { useMainControllerObjectObserver } from '../../modules/sheets'

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
