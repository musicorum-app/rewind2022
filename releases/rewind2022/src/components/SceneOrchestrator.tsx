import Stack from '@rewind/core/src/components/Stack'
import FirstStepScene from '../scenes/FirstStep/FirstStepScene'
import YearSplashScene from '../scenes/YearSplash/YearSplashScene'

export default function SceneOrchestrator() {
  return (
    <Stack>
      <YearSplashScene />
      <FirstStepScene />
    </Stack>
  )
}
