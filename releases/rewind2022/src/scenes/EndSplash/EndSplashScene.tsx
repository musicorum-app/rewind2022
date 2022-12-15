import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import Stack from '@rewind/core/src/components/Stack'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes } from '../../theme/colors'
import { useRewindData } from '../Resolve/useDataResolve'
import { ReactComponent as YearComponent } from './assets/year.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 60px;

  & svg {
    width: 100%;
    min-width: 200px;
    height: auto;

    & path {
      fill: none;
      stroke: white;
      stroke-width: 6px;
      stroke-linejoin: round;
      stroke-linecap: round;
      /* stroke-dasharray: 1000;
    stroke-dashoffset: 1000; */
    }
  }

  @media only screen and (max-width: 700px) {
    padding: 30px;
  }
`

const Text = styled.span`
  text-align: center;
  font-size: 28px;

  @media only screen and (max-width: 700px) {
    font-size: 20px;
  }
`

export default function EndSplashScene() {
  const rewindData = useRewindData()

  const { t } = useTranslation()

  // useEffect(() => {
  //   interpolateBackgroundGradient(
  //     Palettes.Black.gradient,
  //     Palettes.Black.gradient,
  //     1
  //   )
  // }, [rewindData])

  if (!rewindData) {
    return null
  }

  return (
    <Centered>
      <Centered>
        <Container>
          <YearComponent />
          <Text>{t('end_splash.text')}</Text>
        </Container>
      </Centered>
    </Centered>
  )
}
