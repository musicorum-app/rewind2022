import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { usePlayer } from '../../hooks/usePlayer'
import { Palettes, PaletteType } from '../../theme/colors'
import { RewindScene } from '../../types'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import {
  createTopTracksTimelineBackward,
  createTopTracksTimelineForward
} from './topTracksTimeline'
import { usePaletteToolkit } from '../../hooks/usePaletteToolkit'
import { ImageType } from '../../modules/lastfmImage'

export default function TopTracksScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  const scenePaletteType = usePaletteToolkit(
    RewindScene.TopTracksScene,
    rewindData?.tracks.items[0].image.palette ?? PaletteType.Black
  )
  const scenePalette = Palettes[scenePaletteType]

  useEffect(() => {
    if (!rewindData) return

    const palette =
      Palettes[rewindData.artists.items[0].image.palette ?? PaletteType.Black]

    setTimelines(RewindScene.TopTracksScene, {
      forward: {
        id: 'ttr-forward',
        factory: () => createTopTracksTimelineForward(palette, scenePalette)
      },
      backward: {
        id: 'ttr-backward',
        factory: () => createTopTracksTimelineBackward(palette, scenePalette)
      }
    })
  }, [rewindData, scenePalette])

  if (!rewindData) {
    return null
  }

  const items = rewindData.tracks.items.map((track) => ({
    ...track,
    preview: track.resource?.preview
  }))

  return (
    <TopSceneTemplate
      id="ttr"
      imageType={ImageType.ARTIST}
      scene={RewindScene.TopTracksScene}
      ableToPlay
      items={items}
      palette={scenePaletteType}
      topText={t('top_tracks.top')}
      bottomText={t('top_tracks.bottom', {
        count: rewindData.tracks.total
      })}
    />
  )
}
