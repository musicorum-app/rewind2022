import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import { useEffect } from 'react'
import { RewindScene } from '../../types'
import {
  createTopArtistsTimelineBackward,
  createTopArtistsTimelineForward
} from './topArtistsTimeline'
import { Palettes, PaletteType } from '../../theme/colors'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'

export default function TopArtistsScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  useEffect(() => {
    if (!rewindData) return

    const gradient =
      Palettes[rewindData.artists.items[0].image.palette ?? PaletteType.Black]
        .gradient

    setTimelines(RewindScene.TopArtistsScene, {
      forward: {
        id: 'tar-forward',
        factory: () => createTopArtistsTimelineForward(gradient)
      },
      backward: {
        id: 'tar-backward',
        factory: () => createTopArtistsTimelineBackward(gradient)
      }
    })
  }, [rewindData])

  if (!rewindData) {
    return null
  }

  return (
    <TopSceneTemplate
      id="tar"
      items={rewindData.artists.items}
      topText={t('top_artists.top')}
      bottomText={t('top_artists.bottom', {
        count: rewindData.artists.total
      })}
    />
  )
}
