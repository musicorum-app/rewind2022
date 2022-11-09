import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useRef, useLayoutEffect, useState } from 'react'
import { Palettes } from '../../theme/colors'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { useMainControllerObjectObserver } from '../../modules/sheets'
import styled from '@emotion/styled'
import PositionReferenceObject from '../../components/PositionReferenceObject'
import {
  getImage,
  ImageType,
  imageTypeDefaultImages
} from '../../modules/lastfmImage'
import { useWindowSize } from '../../hooks/useWindowSize'
import usePositionedReferenceObjectInterpolation from '../../hooks/usePositionedReferenceObjectInterpolation'
import useSheetObjectValueUpdateWithReferencedInterpolation from '../../hooks/usePositionedReferenceObjectInterpolation'
import { yearSplashObjects } from '../YearSplash/yearSplashSheet'
import { useDomSheetObjectValueUpdate } from '@rewind/core/src/hooks/useDomSheetObjectValueUpdate'
import { firstStepFromYearSplashObjects } from './firstStepSheet'

const TrackImageRefWrapper = styled.div`
  & > div {
    position: absolute;
    right: var(--margin);
    bottom: var(--margin);
    width: 40vw;
    height: 40vw;
  }
`

const TrackImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  border-radius: 4px;
`

const TrackName = styled.h1`
  position: absolute;
  left: var(--margin);
  bottom: var(--margin);
`

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function FirstStepScene() {
  const rewindData = useRewindData()
  const trackImageRef = useRef<HTMLImageElement>(null)

  const { pointerEvents } = useMainControllerObjectObserver(
    firstStepFromYearSplashObjects.mainObject,
    Palettes.MidnightSky.gradient,
    Palettes.MidnightSky.gradient
  )

  useSheetObjectValueUpdateWithReferencedInterpolation(
    'year-splash-track-ref',
    'first-track-ref',
    trackImageRef,
    firstStepFromYearSplashObjects.trackObject,
    'transitionInterpolation'
  )

  useDomSheetObjectValueUpdate(
    trackImageRef,
    yearSplashObjects.firstTrackObject
  )

  if (!rewindData) return null

  return (
    <Centered
      style={{
        pointerEvents: pointerEvents ? 'unset' : 'none'
      }}
    >
      <TrackImageRefWrapper>
        <PositionReferenceObject id="first-track-ref" />
      </TrackImageRefWrapper>

      <TrackName>{rewindData.firstScrobbles[0].name}</TrackName>

      <TrackImage
        ref={trackImageRef}
        src={
          getImage(rewindData.firstScrobbles[0].image, 700) ?? defaultTrackImage
        }
      />
    </Centered>
  )
}
