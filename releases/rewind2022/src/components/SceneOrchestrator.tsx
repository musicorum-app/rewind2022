import Stack from '@rewind/core/src/components/Stack'
import { useEffect } from 'react'
import { useOrchestrator } from '../hooks/useOrchestrator'
import ArtistShareScene from '../scenes/ArtistShare/ArtistShareScene'
import FirstStepScene from '../scenes/FirstStep/FirstStepScene'
import ScrobblesScene from '../scenes/Scrobbles/ScrobblesScene'
import ScrobblesChartScene from '../scenes/ScrobblesChart/ScrobblesChartScene'
import ScrobblesDetailsScene from '../scenes/ScrobblesDetails/ScrobblesDetailsScene'
import TopArtistsScene from '../scenes/TopArtists/TopArtistsScene'
import TopTracksScene from '../scenes/TopTracks/TopTracksScene'
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
      {/* <YearSplashScene /> */}
      {/* <FirstStepScene /> */}
      {/* <ScrobblesScene /> */}
      {/* <ScrobblesChartScene /> */}
      {/* <ScrobblesDetailsScene /> */}
      {/* <TopArtistsScene /> */}
      <ArtistShareScene />
      {/* <TopTracksScene /> */}
    </Stack>
  )
}
