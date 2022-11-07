import Centered from '@rewind/core/src/components/Centered'
import { animate } from 'motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { LoadState, useOrchestrator } from '../../hooks/useOrchestrator'

export default function UserDone() {
  const { t } = useTranslation()
  const mainRef = useRef<HTMLDivElement>(null)
  const setLoadState = useOrchestrator((s) => s.setState)

  const start = () => {
    if (mainRef.current) {
      animate(
        mainRef.current,
        {
          opacity: 0
        },
        {
          easing: 'linear'
        }
      ).finished.then(() => {
        setLoadState(LoadState.PLAY)
      })
    }
  }

  return (
    <Centered
      style={{
        flexDirection: 'column'
      }}
      ref={mainRef}
    >
      <h2
        style={{
          textAlign: 'center'
        }}
      >
        {t('begin.ready')}
      </h2>
      <Button onClick={start}>{t('common.start')}</Button>
    </Centered>
  )
}
