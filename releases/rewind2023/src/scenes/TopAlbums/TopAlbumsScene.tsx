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

  const palette = usePaletteToolkit(RewindScene.TopAlbumsScene, Palettes.Black)

  useEffect(() => {
    if (!rewindData) return

    const palette =
      Palettes[rewindData.tracks.items[0].image.palette ?? PaletteType.Black]
    const targetPalette =
      Palettes[rewindData.albums.items[0].image.palette ?? PaletteType.Black]

    setTimelines(RewindScene.TopAlbumsScene, {
      forward: {
        id: 'tal-forward',
        factory: () => createTopAlbumsTimelineForward(palette, targetPalette)
      },
      backward: {
        id: 'tal-backward',
        factory: () => createTopAlbumsTimelineBackward(palette, targetPalette)
      }
    })
  }, [rewindData])

  if (!rewindData) {
    return null
  }

  return (
    <TopSceneTemplate
      id="tal"
      scene={RewindScene.TopAlbumsScene}
      items={rewindData.albums.items}
      topText={t('top_albums.top')}
      bottomText={t('top_albums.bottom', {
        count: rewindData.albums.total
      })}
    />
  )
}
