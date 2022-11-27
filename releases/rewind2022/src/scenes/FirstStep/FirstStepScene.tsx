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

const TrackImageRefWrapper = styled.div`
  height: auto;
  max-width: min(40vw, 80vh);
  min-width: 300px;
  width: 100%;
  position: absolute;
  right: var(--margin);
  bottom: var(--margin);
  aspect-ratio: 1 / 1;

  & > div {
    margin-left: auto;
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

  & > * {
    opacity: 0;
  }
`

const TrackImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -2;
  border-radius: 4px;
  object-position: bottom;
  object-fit: cover;
`

const FirstText = styled.span`
  position: absolute;
  left: var(--margin);
  top: calc(var(--margin) + 30px);
  margin: 0;
  font-variation-settings: 'wght' 750;
  font-size: 3em;
  opacity: 0;
`

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function FirstStepScene() {
  const rewindData = useRewindData()
  const trackImageRef = useRef<HTMLImageElement>(null)
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  // useSheetObjectValueUpdateWithReferencedInterpolation(
  //   'year-splash-track-ref',
  //   'first-track-ref',
  //   trackImageRef,
  //   firstTrackObjects.trackObject,
  //   'transitionInterpolation'
  // )

  useReferenceObjectUpdater(
    '#year-splash-track-ref',
    '#first-track-ref',
    '#fst-track-image',
    [trackImageRef]
  )

  const color = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles.items[0].image.palette
    return targetPalette ? Palettes[targetPalette].color : Palettes.Burn.color
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
        width: ''
      }}
      id="fst"
    >
      <FirstText
        style={{
          color
        }}
        className="first-one"
      >
        The first one
      </FirstText>
      <Container>
        <TextContainer>
          <h1
            className="track-name"
            // todo
            style={{
              lineHeight: '1.1em',
              fontSize: '6em',
              display: 'flex',
              alignItems: 'flex-end',
              fontVariationSettings: "'wght' 900",
              margin: 0
            }}
          >
            {rewindData.firstScrobbles.items[0].name}
          </h1>
          <h3
            className="sub-text"
            style={{
              color,
              fontVariationSettings: "'wght' 800"
            }}
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
        id="fst-track-image"
        src={
          getImage(rewindData.firstScrobbles.items[0].image, 500) ??
          defaultTrackImage
        }
      />
    </Centered>
  )
}
