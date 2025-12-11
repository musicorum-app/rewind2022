import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useMemo, useEffect } from 'react'
import { Palettes } from '../../theme/colors'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import { yearSplashForwardTimeline } from './yearSplashTimeline'
import { useTimelineController } from '../../hooks/useTimelineController'
import { scenesStore } from '../scenes'
import { RewindScene } from '../../types'
import { useOrchestrator } from '../../hooks/useOrchestrator'
import { usePlayer } from '../../hooks/usePlayer'

const Container = styled(Centered)`
  --to-color: ${Palettes.Gold.darkerColor};
  --from-color: ${Palettes.Gold.darkerColor};
  --percent: 0%;
  background: linear-gradient(
    var(--to-color) var(--percent),
    var(--from-color) calc(var(--percent) + 0.000001%)
  );

  & > div {
    @media only screen and (max-width: 770px) {
      scale: 0.7;
    }

    @media only screen and (max-width: 520px) {
      scale: 0.6;
    }

    @media only screen and (max-width: 430px) {
      scale: 0.5;
    }

    @media only screen and (max-width: 320px) {
      scale: 0.35;
    }
  }
`

const MainYear = styled.div`
  font-variation-settings: 'wght' 800;
  font-size: 220px;
  line-height: 170px;
  background: linear-gradient(
    90deg,
    var(--scene-main-color) var(--percent),
    transparent calc(var(--percent) + 0.000001%)
  );
  color: var(--scene-darker-color);
  padding: 16px 4px;
`

const BottomText = styled.h2`
  font-size: 1.8em;
  text-align: center;
  color: var(--scene-main-color);
`

export default function YearSplashScene() {
  const rewindData = useRewindData()
  const [setAudio, playAudio] = usePlayer((s) => [s.setAudio, s.playAudio])

  useEffect(() => {
    if (rewindData) {
      const item = rewindData.firstScrobbles.items
        .slice(1)
        .find((t) => t?.resource?.preview)
      const preview = item?.resource?.preview
      if (preview) {
        setAudio(RewindScene.YearSplash, preview, item.name)
      }
    }
  }, [])

  const setTimeline = useTimelineController((s) => s.setTimeline)

  const { t } = useTranslation()

  const palette = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles.items[0].image.palette
    return targetPalette ? Palettes[targetPalette] : Palettes.Gold
  }, [rewindData])

  useEffect(() => {
    const tl = yearSplashForwardTimeline(palette.darkerColor)

    scenesStore.getState().setTimelines(RewindScene.YearSplash, {
      forward: {
        factory: () => tl,
        id: 'ysp-forward'
      }
    })
    setTimeline(tl)

    if (useOrchestrator.getState().scene === RewindScene.YearSplash) {
      useOrchestrator.getState().setIsTransitioning(true)
      playAudio(RewindScene.YearSplash)
      tl.play().then(() => {
        useOrchestrator.getState().setIsTransitioning(false)
      })
    }

    return () => {
      tl.kill()
    }

    // yearSplashForwardTimeline.play()
    // yearSplashForwardSheet.sequence.play()
    // return () => yearSplashForwardSheet.sequence.pause()
  }, [])

  if (!rewindData) return null

  return (
    <Container
      is3D
      style={{
        overflow: 'unset',
        flexDirection: 'column',
        '--scene-main-color': palette.color,
        '--scene-darker-color': palette.darkerColor
      }}
      id="ysp"
    >
      <div>
        <MainYear className="main-year">2024</MainYear>
        <BottomText className="bottom-text">
          {t('year_splash.welcome')}
        </BottomText>
      </div>
    </Container>
  )
}
