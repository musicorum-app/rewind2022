import Stack from '@rewind/core/src/components/Stack'
import { useEffect } from 'react'
import { useOrchestrator } from '../hooks/useOrchestrator'
import YearSplashScene from '../scenes/YearSplash/YearSplashScene'
import FirstStepScene from '../scenes/FirstStep/FirstStepScene'
import ScrobblesScene from '../scenes/Scrobbles/ScrobblesScene'
// import ShareScene from '../scenes/Share/ShareScene'
// import CollageScene from '../scenes/Collage/CollageScene'
// import EndSplashScene from '../scenes/EndSplash/EndSplashScene'
// import PlaylistScene from '../scenes/Playlist/PlaylistScene'
// import PopularityScene from '../scenes/Popularity/PopularityScene'
// import ScrobblesChartScene from '../scenes/ScrobblesChart/ScrobblesChartScene'
// import ScrobblesDetailsScene from '../scenes/ScrobblesDetails/ScrobblesDetailsScene'
// import TagCloudScene from '../scenes/TagCloud/TagCloudScene'
// import TopAlbumsScene from '../scenes/TopAlbums/TopAlbumsScene'
// import TopArtistsScene from '../scenes/TopArtists/TopArtistsScene'
// import TopTracksScene from '../scenes/TopTracks/TopTracksScene'
// import FinishScene from '../scenes/Finish/FinishScene'
import { useSwipeable } from 'react-swipeable'

export default function SceneOrchestrator() {
  const [prev, next, setIsTransitioning] = useOrchestrator((s) => [
    s.prev,
    s.next,
    s.setIsTransitioning
  ])

  const handlers = useSwipeable({
    onSwipedUp: next,
    onSwipedDown: prev
  })

  const handleScrollEvent = (event: React.WheelEvent<HTMLDivElement>) => {
    // return 0
    if (event.deltaY > 0) next()
    else prev()
  }

  return (
    <Stack {...handlers} onWheel={handleScrollEvent}>
      <YearSplashScene />
      <FirstStepScene />
      <ScrobblesScene />
      {/* <ScrobblesChartScene />
      <ScrobblesDetailsScene />
      <TopArtistsScene />
      <TopTracksScene />
      <TopAlbumsScene />
      <CollageScene />
      <TagCloudScene />
      <PopularityScene />
      <EndSplashScene />
      <PlaylistScene />
      <ShareScene />
      <FinishScene /> */}
    </Stack>
  )
}
