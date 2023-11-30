/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useLayoutEffect } from 'react'
import Stack from '@rewind/core/src/components/Stack'
import PoweredBy from './PoweredBy'
import MusicorumPresents from './MusicorumPresents'
import RewindText from './RewindText'
import Startup from './Startup'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes } from '../../theme/colors'
import { LoadState, useOrchestrator } from '../../hooks/useOrchestrator'
import { createSplashSceneTimeline } from './splashSceneTimeline'
import { useTimelineController } from '../../hooks/useTimelineController'

const preload = document.querySelector<HTMLDivElement>('#preload')!
const app = document.querySelector<HTMLDivElement>('#root')!

export default function SplashScene() {
  const loadState = useOrchestrator((s) => s.state)

  // useEffect(() => {
  //   app.style.opacity = appValues.opacity.toString()
  //   app.style.display = appValues.active ? 'flex' : 'none'

  //   preload.style.opacity = preloadValues.opacity.toString()
  //   preload.style.display = preloadValues.active ? 'flex' : 'none'
  // }, [appValues, preloadValues])

  useLayoutEffect(() => {
    const timeline = createSplashSceneTimeline()

    useTimelineController.getState().setTimeline(timeline)

    timeline.play()

    return () => {
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    document.body.style.background = Palettes.Sky.darkerColor
  }, [])

  return (
    <Stack>
      <PoweredBy />
      <MusicorumPresents />
      <RewindText />
      {/* <Startup /> */}
    </Stack>
  )
}
