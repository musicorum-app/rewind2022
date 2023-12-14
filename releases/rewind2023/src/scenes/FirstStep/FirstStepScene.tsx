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
import { ImageContainer } from '../../components/ImageContainer'

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 4fr;
  grid-gap: var(--margin);
  position: absolute;
  bottom: 0;
  width: calc(100% - var(--margin) * 2);
  padding-bottom: 60px;
  padding-left: var(--margin);
  padding-right: var(--margin);
  max-width: 2024px;
  box-sizing: border-box;

  @media only screen and (max-width: 700px) {
    width: 100%;
    padding-left: var(--margin);
    grid-template-columns: 1fr;
  }
`

const TrackImage = styled(ImageContainer)`
  height: auto;
  max-width: min(40vw, calc(var(--vh) * 70), 1000px);
  min-width: 300px;
  width: 100%;
  position: absolute;
  right: var(--margin);
  bottom: 60px;
  aspect-ratio: 1 / 1;

  & > div {
    margin-left: auto;
  }

  @media only screen and (max-width: 1000px) {
    position: fixed;
    bottom: unset;
    top: 130px;
    max-width: min(80vw, calc(var(--vh) * 60 - 300px));
    right: var(--margin);
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;

  & > * {
    opacity: 0;
  }

  & .track-name {
    font-size: 6em;
    background-color: var(--scene-main-color);
    color: var(--scene-darker-color);
  }

  @media only screen and (max-width: 700px) {
    & .track-name {
      font-size: 4.5em;
    }
    & h3 {
      font-size: 1em;
    }
  }

  @media only screen and (max-height: 820px) {
    & .track-name {
      font-size: 3em;
    }
    & h3 {
      font-size: 0.8em;
    }
  }
`

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

  const imageUrl =
    getImage(rewindData.firstScrobbles.items[0].image, 500) ?? defaultTrackImage

  return (
    <Centered
      style={{
        '--scene-main-color': palette.color,
        '--scene-darker-color': palette.darkerColor,
        color: 'var(--scene-main-color)'
      }}
      id="fst"
    >
      <SceneHeader className="first-one opacity-0">
        {t('first_track.title')}
      </SceneHeader>

      <Container>
        <TextContainer>
          <span
            className="track-name"
            // todo
            style={{
              lineHeight: '1.1em',
              display: 'inline',
              fontVariationSettings: "'wght' 900",
              margin: 0
            }}
          >
            {rewindData.firstScrobbles.items[0].name}
          </span>
          <h3
            className="sub-text"
            style={{
              color: palette.color,
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

        <TrackImage className="track-image" src={imageUrl} />
      </Container>
    </Centered>
  )
}
