import Stack from '@rewind/core/src/components/Stack'
import { useEffect } from 'react'
import { useOrchestrator } from '../hooks/useOrchestrator'
import FirstStepScene from '../scenes/FirstStep/FirstStepScene'
import { mainSheet, sceneTimings } from '../scenes/scenes'
import ScrobblesScene from '../scenes/Scrobbles/ScrobblesScene'
import YearSplashScene from '../scenes/YearSplash/YearSplashScene'

export default function SceneOrchestrator() {
  const setIsTransitioning = useOrchestrator((s) => s.setIsTransitioning)

  useEffect(() => {
    // mainSheet.sequence
    //   .play({
    //     range: sceneTimings.YearSplash.forward
    //   })
    //   .then(() => {
    //     setIsTransitioning(false)
    //   })
  }, [])

  return (
    <Stack>
      <YearSplashScene />
      {/* <FirstStepScene /> */}
      {/* <ScrobblesScene /> */}
    </Stack>
  )
}
