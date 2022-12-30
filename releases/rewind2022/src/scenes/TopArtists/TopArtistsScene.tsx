import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import { useEffect, useMemo } from 'react'
import { RewindScene } from '../../types'
import {
  createTopArtistsTimelineBackward,
  createTopArtistsTimelineForward
} from './topArtistsTimeline'
import { Palettes, PaletteType } from '../../theme/colors'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import { useSceneAudio } from '../../hooks/useSceneAudio'

export default function TopArtistsScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  const selectedResource = useMemo(() => {
    if (!rewindData) return

    const topArtist = rewindData.artists.items[0].name
    const topTracks = rewindData.tracks.items

    return (
      rewindData.tracks.resources
        .filter((r) => r.artist.toLowerCase() === topArtist.toLowerCase())
        .filter(
          (r) =>
            !(
              topTracks.map((t) => t.name).includes(r.name) &&
              topTracks.map((t) => t.artist).includes(r.artist)
            )
        )
        .slice(0, 2)
        .at(-1) || rewindData?.tracks.resources[10]
    )
  }, [rewindData])

  useSceneAudio(
    RewindScene.TopArtistsScene,
    selectedResource?.preview,
    selectedResource?.name
  )

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
      scene={RewindScene.TopArtistsScene}
      items={rewindData.artists.items}
      topText={t('top_artists.top')}
      bottomText={t('top_artists.bottom', {
        count: rewindData.artists.total
      })}
    />
  )
}
