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
import { useWindowSize } from '../../hooks/useWindowSize'
import usePositionedReferenceObjectInterpolation from '../../hooks/useSheetObjectValueUpdateWithReferencedInterpolation'
import useSheetObjectValueUpdateWithReferencedInterpolation from '../../hooks/useSheetObjectValueUpdateWithReferencedInterpolation'
import { useDomSheetObjectValueUpdate } from '@rewind/core/src/hooks/useDomSheetObjectValueUpdate'
import { firstTrackObjects } from './firstStepObjects'
import { Textfit } from 'react-textfit'
import { useTranslation } from 'react-i18next'

const TrackImageRefWrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 300px);
  height: calc(100vh - 300px);

  & > div {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr;
  grid-gap: var(--margin);
  position: absolute;
  bottom: 0;
  width: calc(100% - var(--margin) * 2);
  padding-bottom: var(--margin);
  max-width: 1324px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
`

const TrackImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -2;
  border-radius: 4px;
  object-fit: contain;
  object-position: bottom;
`

const FirstText = styled.span`
  position: absolute;
  left: var(--margin);
  top: calc(var(--margin) + 30px);
  margin: 0;
  font-variation-settings: 'wght' 750;
  font-size: 3em;
`

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function FirstStepScene() {
  const rewindData = useRewindData()
  const trackImageRef = useRef<HTMLImageElement>(null)

  const titleRef = useRef<HTMLSpanElement>(null)
  const trackNameRef = useRef<HTMLHeadingElement>(null)
  const trackDetailsRef = useRef<HTMLHeadingElement>(null)

  const { t } = useTranslation()

  useSheetObjectValueUpdateWithReferencedInterpolation(
    'year-splash-track-ref',
    'first-track-ref',
    trackImageRef,
    firstTrackObjects.trackObject,
    'transitionInterpolation'
  )

  useDomSheetObjectValueUpdate(titleRef, firstTrackObjects.titleObject)
  useDomSheetObjectValueUpdate(trackNameRef, firstTrackObjects.trackNameObject)
  useDomSheetObjectValueUpdate(
    trackDetailsRef,
    firstTrackObjects.trackDetailsObject
  )

  const color = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles.items[0].image.palette
    return targetPalette ? Palettes[targetPalette].color : Palettes.Burn.color
  }, [rewindData])

  if (!rewindData) return null

  return (
    <Centered
      style={{
        width: ''
      }}
    >
      <FirstText
        style={{
          color
        }}
        ref={titleRef}
      >
        The first one
      </FirstText>
      <Container>
        <TextContainer>
          <h1
            // todo
            style={{
              lineHeight: '1.1em',
              fontSize: '6em',
              display: 'flex',
              alignItems: 'flex-end',
              fontVariationSettings: "'wght' 900",
              margin: 0
            }}
            ref={trackNameRef}
          >
            {rewindData.firstScrobbles.items[0].name}
          </h1>
          <h3
            style={{
              color,
              fontVariationSettings: "'wght' 600"
            }}
            ref={trackDetailsRef}
          >
            {t('first_track.sub_text', {
              count: rewindData.firstScrobbles.firstScrobbleTrackCount - 1,
              date: new Date(rewindData.firstScrobbles.items[0].date!),
              formatParams: {
                date: {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }
              }
            })}
          </h3>
        </TextContainer>

        <TrackImageRefWrapper>
          <PositionReferenceObject id="first-track-ref" />
        </TrackImageRefWrapper>
      </Container>
      <TrackImage
        ref={trackImageRef}
        src={
          getImage(rewindData.firstScrobbles.items[0].image, 500) ??
          defaultTrackImage
        }
      />
    </Centered>
  )
}
