import Stack from '@rewind/core/src/components/Stack'
import { useEffect } from 'react'
import { useOrchestrator } from '../hooks/useOrchestrator'
import ShareScene from '../scenes/Share/ShareScene'
import CollageScene from '../scenes/Collage/CollageScene'
import EndSplashScene from '../scenes/EndSplash/EndSplashScene'
import FirstStepScene from '../scenes/FirstStep/FirstStepScene'
import PlaylistScene from '../scenes/Playlist/PlaylistScene'
import PopularityScene from '../scenes/Popularity/PopularityScene'
import ScrobblesScene from '../scenes/Scrobbles/ScrobblesScene'
import ScrobblesChartScene from '../scenes/ScrobblesChart/ScrobblesChartScene'
import ScrobblesDetailsScene from '../scenes/ScrobblesDetails/ScrobblesDetailsScene'
import TagCloudScene from '../scenes/TagCloud/TagCloudScene'
import TopAlbumsScene from '../scenes/TopAlbums/TopAlbumsScene'
import TopArtistsScene from '../scenes/TopArtists/TopArtistsScene'
import TopTracksScene from '../scenes/TopTracks/TopTracksScene'
import YearSplashScene from '../scenes/YearSplash/YearSplashScene'
import FinishScene from '../scenes/Finish/FinishScene'

export default function SceneOrchestrator() {
  const setIsTransitioning = useOrchestrator((s) => s.setIsTransitioning)

  return (
    <Stack>
      <YearSplashScene />
      <FirstStepScene />
      <ScrobblesScene />
      {/* <ScrobblesChartScene /> */}
      {/* <ScrobblesDetailsScene /> */}
      {/* <TopArtistsScene /> */}
      {/* <TopTracksScene /> */}
      {/* <TopAlbumsScene /> */}
      {/* <CollageScene /> */}
      {/* <TagCloudScene /> */}
      {/* <PopularityScene /> */}
      {/* <EndSplashScene /> */}
      {/* <PlaylistScene /> */}
      {/* <ShareScene /> */}
      {/* <FinishScene /> */}
    </Stack>
  )
}
