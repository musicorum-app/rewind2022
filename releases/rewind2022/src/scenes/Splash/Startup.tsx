import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { animate } from 'motion'
import { CSSProperties, useRef } from 'react'
import Button from '../../components/Button'
import { LoadState, useOrchestrator } from '../../hooks/useOrchestrator'
import { Palette } from '../../theme/colors'
import { useSplashSheet } from './useSplashSheet'

const Text = styled.h1`
  margin: 0;
  text-align: center;
  font-size: clamp(20px, 6vw, 90px);
  line-height: 105%;
`

const ContinueButton = styled(Button)`
  margin-top: 50px;
`

export default function Startup() {
  const [topText, bottomText, button, loadSheet, loadValues] = useSplashSheet(
    (s) => [
      s.topTextValues,
      s.bottomTextValues,
      s.buttonValues,
      s.loadSheet,
      s.loadValues
    ]
  )

  const setOrchestratorState = useOrchestrator((s) => s.setState)

  const createStyle = (values: typeof topText): CSSProperties => ({
    opacity: values.opacity,
    transform: `translateY(${values.y}px) scale(${values.scale})`
  })

  const handleContinue = () => {
    loadSheet.sequence.play().then(() => {
      setOrchestratorState(LoadState.RESOLVE)
    })
  }

  return (
    <Centered
      style={{
        flexDirection: 'column',
        transform: `translateX(${loadValues.x}px)`,
        opacity: loadValues.opacity
      }}
    >
      <Text style={createStyle(topText)}>The time to rewind your</Text>
      <Text style={createStyle(bottomText)}>2022 in music has come</Text>

      <ContinueButton
        style={{
          opacity: button.opacity,
          visibility: button.active ? 'visible' : 'hidden'
        }}
        background={Palette.SweetWine}
        onClick={handleContinue}
      >
        Continue
      </ContinueButton>
    </Centered>
  )
}
