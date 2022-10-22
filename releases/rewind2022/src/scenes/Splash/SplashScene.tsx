/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'
import Stack from '@rewind/core/src/components/Stack'
import PoweredBy from './PoweredBy'
import MusicorumPresents from './MusicorumPresents'
import RewindText from './RewindText'
import { useSplashSheet } from './useSplashSheet'
import Startup from './Startup'

const preload = document.querySelector<HTMLDivElement>('#preload')!
const app = document.querySelector<HTMLDivElement>('#root')!

export default function SplashScene() {
  const [sheet, appValues, preloadValues] = useSplashSheet((s) => [
    s.sheet,
    s.appValues,
    s.preloadValues
  ])

  useEffect(() => {
    app.style.opacity = appValues.opacity.toString()
    app.style.display = appValues.active ? 'flex' : 'none'

    preload.style.opacity = preloadValues.opacity.toString()
    preload.style.display = preloadValues.active ? 'flex' : 'none'

    sheet.sequence.play()
  }, [appValues, preloadValues])

  return (
    <Stack>
      <PoweredBy />
      <MusicorumPresents />
      <RewindText />
      <Startup />
    </Stack>
  )
}
