import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import Stack from '@rewind/core/src/components/Stack'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes } from '../../theme/colors'
import { RewindScene } from '../../types'
import { useRewindData } from '../Resolve/useDataResolve'
import { ReactComponent as YearComponent } from './assets/year.svg'
import yearSvg from './assets/year.svg'
import { useCollageStore } from '../Collage/collage.store'
import { keyframes } from '@emotion/react'
import useWindowResize from '@rewind/core/src/hooks/useWindowResize'

const backgroundMoveKeyframe = keyframes`
  0% {
    background-position-y: 0%;
  }
  100% {
    background-position-y: 1000%;
  }`

const Container = styled.div<{ collageUrl: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 60px;
  width: 100%;

  & .stack {
    width: 100%;
    min-width: 200px;
    height: 228px;
    overflow: visible;
  }

  & svg {
    width: 100%;
    min-width: 200px;
    height: auto;
    overflow: visible;

    &.year-background {
      opacity: 0;
      background: url(${(p) => p.collageUrl}) repeat-y;
      background-size: cover;
      background-position-y: 0%;
      mask-image: url(${yearSvg});
      mask-size: contain;
      animation: ${backgroundMoveKeyframe} 100s reverse linear infinite;
      & path {
        fill: none;
        stroke: none;
      }
    }

    &.year-stroke {
      opacity: 0;
      & path {
        fill: none;
        stroke: white;
        stroke-width: 6px;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-dasharray: 1;
        /* stroke-dasharray: 1000;
      stroke-dashoffset: 1000; */
      }
    }
  }

  @media only screen and (max-width: 700px) {
    padding: 30px;
  }
`

const Text = styled.span`
  text-align: center;
  font-size: 28px;
  opacity: 0;

  @media only screen and (max-width: 700px) {
    font-size: 20px;
  }
`

export default function EndSplashScene() {
  const rewindData = useRewindData()
  const collageUrl = useCollageStore()

  const { t } = useTranslation()
  const yearRef = useRef<SVGSVGElement | null>(null)
  const stackRef = useRef<HTMLDivElement | null>(null)

  useSceneAudio(
    RewindScene.EndSplashScene,
    rewindData?.tracks.resources[14].preview,
    rewindData?.tracks.resources[14].name
  )

  // useEffect(() => {
  //   interpolateBackgroundGradient(
  //     Palettes.Black.gradient,
  //     Palettes.Black.gradient,
  //     1
  //   )
  // }, [rewindData])

  function update() {
    const yearElement = document.querySelector('.year-background') // fodase ref
    if (!yearElement || !stackRef.current) return

    const { height } = yearElement.getBoundingClientRect()
    stackRef.current.style.height = height + 'px'
  }

  useWindowResize(update)
  useLayoutEffect(update, [])

  if (!rewindData) {
    return null
  }

  return (
    <Centered id="end">
      <Centered>
        <Container collageUrl={collageUrl || ''}>
          <Stack className="stack" ref={stackRef}>
            <YearComponent className="year-background" />
            <YearComponent className="year-stroke" />
          </Stack>
          <Text>{t('end_splash.text')}</Text>
        </Container>
      </Centered>
    </Centered>
  )
}
