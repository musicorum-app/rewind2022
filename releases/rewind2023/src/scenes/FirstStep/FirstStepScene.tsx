import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { Palettes } from '../../theme/colors'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import styled from '@emotion/styled'
import PositionReferenceObject from '../../components/PositionReferenceObject'
import {
  getImage,
  ImageType,
  imageTypeDefaultImages
} from '../../modules/lastfmImage'
import { useEffect } from 'react'
import { Textfit } from 'react-textfit'
import { useTranslation } from 'react-i18next'
import useReferenceObjectUpdater from '../../hooks/useReferenceObjectUpdater'
import { scenesStore } from '../scenes'
import { RewindScene } from '../../types'
import {
  firstStepBackwardTimeline,
  firstStepForwardTimeline
} from './firstStepTimeline'
import { usePlayer } from '../../hooks/usePlayer'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import ImageWithBorder from '../../components/ImageWithBorder'
import { SceneHeader } from '../../components/SceneHeader'
import { Box } from '@chakra-ui/react'

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function FirstStepScene() {
  const rewindData = useRewindData()
  const trackImageRef = useRef<HTMLImageElement>(null)
  const setTimelines = scenesStore((s) => s.setTimelines)

  useSceneAudio(
    RewindScene.FirstTrack,
    rewindData?.firstScrobbles.items[0].resource?.preview,
    rewindData?.firstScrobbles.items[0].name
  )

  const { t } = useTranslation()

  // useSheetObjectValueUpdateWithReferencedInterpolation(
  //   'year-splash-track-ref',
  //   'first-track-ref',
  //   trackImageRef,
  //   firstTrackObjects.trackObject,
  //   'transitionInterpolation'
  // )

  const palette = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles.items[0].image.palette
    return targetPalette ? Palettes[targetPalette] : Palettes.Chuu
  }, [rewindData])

  useEffect(() => {
    console.log('timeline changed')
    setTimelines(RewindScene.FirstTrack, {
      forward: {
        id: 'fst-forward',
        factory: firstStepForwardTimeline
      },
      backward: {
        id: 'fst-backward',
        factory: firstStepBackwardTimeline
      }
    })
  }, [firstStepForwardTimeline])

  if (!rewindData) return null

  return (
    <Centered
      style={{
        '--scene-main-color': palette.color,
        '--scene-darker-color': palette.darkerColor,
        color: 'var(--scene-main-color)'
      }}
      id="fst"
    >
      <SceneHeader>The first one</SceneHeader>
    </Centered>
  )
}
