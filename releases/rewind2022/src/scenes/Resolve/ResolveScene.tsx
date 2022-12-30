import Stack from '@rewind/core/src/components/Stack'
import UserInput from './UserInput'
import { useEffect } from 'react'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { DataResolveStep, useDataResolve } from './useDataResolve'
import UserConfirm from './UserConfirm'
import UserLoading from './UserLoading'
import { useTranslation } from 'react-i18next'
import UserDone from './UserDone'
import { Palettes } from '../../theme/colors'
import CacheConfirm from './CacheConfirm'

const preload = document.querySelector<HTMLDivElement>('#preload')!
const app = document.querySelector<HTMLDivElement>('#root')!

export default function ResolveScene() {
  const currentStep = useDataResolve((s) => s.step)

  const { i18n } = useTranslation()
  // @ts-expect-error tmnc
  window.t = i18n

  useEffect(() => {
    // startSheet.sequence.play()
    app.style.opacity = '1'
    app.style.display = 'flex'

    preload.style.opacity = '0'
    preload.style.display = 'none'

    interpolateBackgroundGradient(
      Palettes.MidnightSky.gradient,
      Palettes.MidnightSky.gradient,
      1
    )
  }, [])

  return (
    <Stack>
      {currentStep === DataResolveStep.USER_INPUT && <UserInput />}

      {currentStep === DataResolveStep.USER_CONFIRM && <UserConfirm />}

      {currentStep === DataResolveStep.LOADING && <UserLoading />}

      {currentStep === DataResolveStep.CACHE_CONFIRM && <CacheConfirm />}

      {currentStep === DataResolveStep.DONE && <UserDone />}
    </Stack>
  )
}
