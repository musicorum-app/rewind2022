import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { useRewindData } from '../Resolve/useDataResolve'

export default function TopArtistsScene() {
  const rewindData = useRewindData()

  const { t } = useTranslation()

  if (!rewindData) {
    return null
  }

  return (
    <TopSceneTemplate
      items={rewindData.artists.items}
      topText={t('top_artists.top')}
      bottomText={t('top_artists.bottom', {
        count: rewindData.artists.total
      })}
    />
  )
}