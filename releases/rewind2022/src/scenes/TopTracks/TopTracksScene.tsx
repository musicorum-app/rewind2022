import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { usePlayer } from '../../hooks/usePlayer'
import { useRewindData } from '../Resolve/useDataResolve'

export default function TopTracksScene() {
  const rewindData = useRewindData()

  const { t } = useTranslation()

  if (!rewindData) {
    return null
  }

  const color = rewindData.tracks.items[0].image.color

  const items = rewindData.tracks.items.map((track) => ({
    ...track,
    preview: track.resource?.preview
  }))

  return (
    <TopSceneTemplate
      ableToPlay
      items={items}
      topText={t('top_tracks.top')}
      bottomText={t('top_tracks.bottom', {
        count: rewindData.tracks.total
      })}
    />
  )
}
