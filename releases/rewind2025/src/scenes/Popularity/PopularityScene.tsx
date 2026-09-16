import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ImageWithBorder from '../../components/ImageWithBorder'
import { useOrchestrator } from '../../hooks/useOrchestrator'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes, PaletteType } from '../../theme/colors'
import { RewindScene } from '../../types'
import {
  createEndSplashTimelineBackward,
  createEndSplashTimelineForward
} from '../EndSplash/endSplashTimeline'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import {
  createPopularityTimelineBackward,
  createPopularityTimelineForward
} from './popularityTimeline'
import { usePaletteToolkit } from '../../hooks/usePaletteToolkit'
import { ImageContainer } from '../../components/ImageContainer'

const Container = styled.div`
  --item-w: 440px;

  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 60px;
  padding-bottom: 120px;

  & h5 {
    opacity: 0;
    font-size: 23px;
    text-align: center;
    margin: 0;
    @media only screen and (max-width: 1500px) {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 1500px) {
    --item-w: 300px;
  }

  @media only screen and (max-height: 800px) {
    --item-w: 300px;
  }

  @media only screen and (max-width: 1130px) {
    flex-direction: column;
    gap: 24px;
  }

  @media only screen and (max-height: 1200px) and (max-width: 1130px) {
    --item-w: 280px;
  }

  @media only screen and (max-height: 930px) and (max-width: 1130px) {
    --item-w: 200px;
    gap: 20px;

    h5 {
      font-size: 14px;
    }
  }

  @media only screen and (max-height: 760px) and (max-width: 1130px) {
    --item-w: 180px;
  }

  @media only screen and (max-height: 770px) and (max-width: 1130px) {
    --item-w: 160px;
  }

  @media only screen and (max-height: 650px) {
    --item-w: 90px;

    h5 {
      font-size: 12px;
    }
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  align-items: center;
  width: var(--item-w);
  max-width: calc(100vw - 80px);

  & .image {
    opacity: 0;
    width: var(--item-w);
    height: var(--item-w);
  }

  & span {
    text-shadow: 1px 1px 20px rgb(0 0 0 / 80%);
    opacity: 0;
    pointer-events: none;

    & b {
      font-variation-settings: 'wght' 800;
    }
  }

  @media only screen and (max-height: 930px) and (max-width: 1130px) {
    width: calc(var(--item-w) + 120px);
    gap: 8px;
    font-size: 15px;
  }

  @media only screen and (max-height: 650px) {
    gap: 6px;
    font-size: 12px;
  }
`

const NumberText = styled.h2`
  pointer-events: none;
  opacity: 0;
  font-size: 150px;
  line-height: 220px;
  transform: scale(2);
  z-index: 20;
  font-variation-settings: 'wght' 900;
  margin: 0;
  padding: 0 12px;
  color: var(--scene-darker-color);
  background: var(--scene-main-color);

  @media only screen and (max-width: 1500px) {
    transform: scale(1.6);
    line-height: 140px;
  }

  @media only screen and (max-height: 800px) {
    transform: scale(1.4);
    line-height: 160px;
  }

  @media only screen and (max-width: 1130px) {
    transform: scale(1);
    font-size: 80px;
    line-height: 80px;
  }

  @media only screen and (max-height: 930px) and (max-width: 1130px) {
    font-size: 60px;
    line-height: 50px;
  }
`

const Note = styled.span`
  position: absolute;
  pointer-events: none;
  left: var(--margin);
  bottom: 80px;
  font-size: 13px;
  text-shadow: 1px 1px 20px rgb(0 0 0 / 80%);
  opacity: 0;

  @media only screen and (max-height: 650px) {
    font-size: 9px;
  }
`

export default function PopularityScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)
  const scene = useOrchestrator((s) => s.scene)

  const { t } = useTranslation()

  const selectedResource = useMemo(() => {
    if (!rewindData) return

    const artist = rewindData.artists.popularity.high?.name

    return (
      rewindData.tracks.resources.find(
        (r) => r.artist.toLowerCase() === artist?.toLowerCase()
      ) || rewindData?.tracks.resources[13]
    )
  }, [rewindData])

  useSceneAudio(
    RewindScene.PopularityScene,
    selectedResource?.preview,
    selectedResource?.name
  )

  const scenePaletteType = usePaletteToolkit(
    RewindScene.PopularityScene,
    rewindData?.artists.popularity.high?.image.palette || PaletteType.Candy
  )
  const scenePalette = Palettes[scenePaletteType]

  useEffect(() => {
    const backwardPalette =
      Palettes[rewindData?.albums.items[0].image.palette ?? PaletteType.Wine]
    setTimelines(RewindScene.PopularityScene, {
      forward: {
        id: 'pop-forward',
        factory: () =>
          createPopularityTimelineForward(backwardPalette, scenePalette)
      },
      backward: {
        id: 'pop-backward',
        factory: () =>
          createPopularityTimelineBackward(backwardPalette, scenePalette)
      }
    })

    setTimelines(RewindScene.EndSplashScene, {
      forward: {
        id: 'end-forward',
        factory: () => createEndSplashTimelineForward(scenePalette)
      },
      backward: {
        id: 'end-backward',
        factory: () => createEndSplashTimelineBackward(scenePalette)
      }
    })
  }, [scenePalette])

  if (!rewindData) {
    return null
  }

  return (
    <Centered
      column
      id="pop"
      pointerEvents={scene === RewindScene.PopularityScene}
      style={{
        '--scene-main-color': scenePalette.color,
        '--scene-darker-color': scenePalette.darkerColor
      }}
    >
      <Container>
        <Item>
          <ImageContainer
            className="image"
            src={rewindData.artists.popularity.low?.image.url ?? ''}
          />
          <span>
            <Trans
              i18nKey={`popularity.low`}
              values={{
                name: rewindData.artists.popularity.low?.name,
                value: rewindData.artists.popularity.low?.resource?.popularity
              }}
              components={[<b></b>]}
            />
          </span>
        </Item>
        <Item>
          <NumberText className="number">
            {Math.round(rewindData.artists.popularity.average)}%
          </NumberText>
          <h5>{t('popularity.subtitle')}</h5>
        </Item>
        <Item>
          <ImageContainer
            src={rewindData.artists.popularity.high?.image.url ?? ''}
            className="image"
          />
          <span>
            <Trans
              i18nKey={`popularity.high`}
              values={{
                name: rewindData.artists.popularity.high?.name,
                value: rewindData.artists.popularity.high?.resource?.popularity
              }}
              components={[<b></b>]}
            />
          </span>
        </Item>
      </Container>
      <Note>{t('popularity.note')}</Note>
    </Centered>
  )
}
