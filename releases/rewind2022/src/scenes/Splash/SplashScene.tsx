/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'
import Stack from '@rewind/core/src/components/Stack'
import PoweredBy from './PoweredBy'
import MusicorumPresents from './MusicorumPresents'
import RewindText from './RewindText'
import { useSplashSheet } from './useSplashSheet'
import Startup from './Startup'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes } from '../../theme/colors'
import { LoadState, useOrchestrator } from '../../hooks/useOrchestrator'

const preload = document.querySelector<HTMLDivElement>('#preload')!
const app = document.querySelector<HTMLDivElement>('#root')!

export default function SplashScene() {
  const [sheet, appValues, preloadValues] = useSplashSheet((s) => [
    s.sheet,
    s.appValues,
    s.preloadValues
  ])
  const loadState = useOrchestrator((s) => s.state)

  useEffect(() => {
    app.style.opacity = appValues.opacity.toString()
    app.style.display = appValues.active ? 'flex' : 'none'

    preload.style.opacity = preloadValues.opacity.toString()
    preload.style.display = preloadValues.active ? 'flex' : 'none'
  }, [appValues, preloadValues])

  useEffect(() => {
    sheet.sequence.play()

    return () => sheet.sequence.pause()
  }, [])

  useEffect(() => {
    interpolateBackgroundGradient(
      Palettes.Burn.gradient,
      Palettes.Burn.gradient,
      1
    )
  }, [])

  return (
    <Stack>
      <PoweredBy />
      <MusicorumPresents />
      <RewindText />
      <Startup />
    </Stack>
  )
}
