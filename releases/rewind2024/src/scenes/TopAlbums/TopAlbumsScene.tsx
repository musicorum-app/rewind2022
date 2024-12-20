import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { Palettes, PaletteType } from '../../theme/colors'
import { RewindScene } from '../../types'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import {
  createTopAlbumsTimelineBackward,
  createTopAlbumsTimelineForward
} from './topAlbumsTimeline'
import { usePaletteToolkit } from '../../hooks/usePaletteToolkit'
import { ImageType } from '../../modules/lastfmImage'

export default function TopAlbumsScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  const selectedResource = useMemo(() => {
    if (!rewindData) return

    const topAlbum = rewindData.albums.items[0].name

    return (
      rewindData.tracks.resources.find(
        (r) => r.album?.toLowerCase() === topAlbum.toLowerCase()
      ) || rewindData?.tracks.resources[9]
    )
  }, [rewindData])

  useSceneAudio(
    RewindScene.TopAlbumsScene,
    selectedResource?.preview,
    selectedResource?.name
  )

  const scenePaletteType = usePaletteToolkit(
    RewindScene.TopAlbumsScene,
    rewindData?.albums.items[0].image.palette ?? PaletteType.Wine
  )
  const scenePalette = Palettes[scenePaletteType]

  useEffect(() => {
    if (!rewindData) return

    const palette =
      Palettes[rewindData.tracks.items[0].image.palette ?? PaletteType.Black]

    setTimelines(RewindScene.TopAlbumsScene, {
      forward: {
        id: 'tal-forward',
        factory: () => createTopAlbumsTimelineForward(palette, scenePalette)
      },
      backward: {
        id: 'tal-backward',
        factory: () => createTopAlbumsTimelineBackward(palette, scenePalette)
      }
    })
  }, [rewindData, scenePalette])

  if (!rewindData) {
    return null
  }

  return (
    <TopSceneTemplate
      id="tal"
      imageType={ImageType.TRACK}
      scene={RewindScene.TopAlbumsScene}
      items={rewindData.albums.items}
      topText={t('top_albums.top')}
      palette={scenePaletteType}
      bottomText={t('top_albums.bottom', {
        count: rewindData.albums.total
      })}
    />
  )
}
