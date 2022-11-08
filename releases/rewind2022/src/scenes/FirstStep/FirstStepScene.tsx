import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useRef, useLayoutEffect, useState } from 'react'
import { firstStepObjects } from './firstStepSheet'
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
  z-index: -1;
`

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function FirstStepScene() {
  const rewindData = useRewindData()
  const trackImageRef = useRef<HTMLImageElement>(null)
  const [trackInterpolation, setTrackInterpolation] = useState(0)

  const { pointerEvents } = useMainControllerObjectObserver(
    firstStepObjects.mainObject,
    Palettes.MidnightSky.gradient,
    Palettes.MidnightSky.gradient
  )

  useLayoutEffect(() => {
    const unsubscribe = firstStepObjects.trackObject.onValuesChange(
      (values) => {
        setTrackInterpolation(values.transitionInterpolation)
      }
    )

    return unsubscribe
  })

  usePositionedReferenceObjectInterpolation(
    'year-splash-track-ref',
    'first-track-ref',
    trackImageRef,
    trackInterpolation
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

      <TrackImage
        ref={trackImageRef}
        src={
          getImage(rewindData.firstScrobbles[0].image, 700) ?? defaultTrackImage
        }
      />
    </Centered>
  )
}
