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

export default function TopTracksScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  useEffect(() => {
    if (!rewindData) return

    const gradient =
      Palettes[rewindData.artists.items[0].image.palette ?? PaletteType.Black]
        .gradient
    const targetGradient =
      Palettes[rewindData.tracks.items[0].image.palette ?? PaletteType.Black]
        .gradient

    setTimelines(RewindScene.TopTracksScene, {
      forward: {
        id: 'ttr-forward',
        factory: () => createTopTracksTimelineForward(gradient, targetGradient)
      },
      backward: {
        id: 'ttr-backward',
        factory: () => createTopTracksTimelineBackward(gradient, targetGradient)
      }
    })
  }, [rewindData])

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
      ableToPlay
      items={items}
      topText={t('top_tracks.top')}
      bottomText={t('top_tracks.bottom', {
        count: rewindData.tracks.total
      })}
    />
  )
}
