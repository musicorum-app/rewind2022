import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { animate } from 'motion'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { DataResolveStep, useDataResolve } from './useDataResolve'
import { useRef, useEffect } from 'react'
import { LoadState, useOrchestrator } from '../../hooks/useOrchestrator'

export default function CacheConfirm() {
  const [setStep, user, step] = useDataResolve((s) => [
    s.setStep,
    s.user,
    s.step
  ])

  const setLoadState = useOrchestrator((s) => s.setState)

  const { t } = useTranslation()

  const containerRef = useRef<HTMLDivElement>(null)

  const goBack = () => {
    animate(
      containerRef.current!,
      {
        opacity: 0,
        x: 80
      },
      {
        easing: 'ease-in',
        duration: 0.4
      }
    ).finished.then(() => {
      localStorage.removeItem('Rewind23Cache')
      setStep(DataResolveStep.USER_CONFIRM)
    })
  }

  useEffect(() => {
    if (step === DataResolveStep.CACHE_CONFIRM && containerRef.current) {
      animate(
        containerRef.current,
        {
          opacity: [0, 1],
          x: [80, 0]
        },
        {
          easing: 'ease-out',
          duration: 0.4
        }
      )
    }
  }, [])

  return (
    <Centered pointerEvents>
      <div ref={containerRef}>
        <p
          style={{
            maxWidth: 320
          }}
        >
          {t('loading.previous_found')}
        </p>
        <Flex>
          <Button background="rgba(255, 255, 255, 0.2)" onClick={goBack}>
            {t('common.back')}
          </Button>
          <Button
            style={{
              marginLeft: 10
            }}
            onClick={() => setLoadState(LoadState.PLAY)}
          >
            {t('common.continue')}
          </Button>
        </Flex>
      </div>
    </Centered>
  )
}
