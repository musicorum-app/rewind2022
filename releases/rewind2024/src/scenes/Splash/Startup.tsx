import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { animate } from 'motion'
import { CSSProperties, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { LoadState, useOrchestrator } from '../../hooks/useOrchestrator'
import { Palettes } from '../../theme/colors'
import { continueTimeline } from './splashSceneTimeline'
import { useTimelineController } from '../../hooks/useTimelineController'

const Text = styled.h1`
  margin: 0;
  text-align: center;
  font-size: clamp(20px, 6vw, 90px);
  line-height: 105%;
  font-variation-settings: 'wght' 800;
`

const ContinueButton = styled(Button)`
  margin-top: 50px;
`

export default function Startup() {
  const { t } = useTranslation()

  const setOrchestratorState = useOrchestrator((s) => s.setState)

  const handleContinue = () => {
    continueTimeline.play().then(() => {
      setOrchestratorState(LoadState.RESOLVE)
      useTimelineController.getState().setTimeline(null)
    })
  }

  return (
    <Centered
      pointerEvents
      style={{
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      className="splash-startup-text"
    >
      <Text>{t('splash.text1')}</Text>
      <Text>{t('splash.text2')}</Text>

      <ContinueButton
        background={Palettes.Gold.color}
        className="splash-continue-btn"
        onClick={handleContinue}
      >
        {t('common.continue')}
      </ContinueButton>
    </Centered>
  )
}
