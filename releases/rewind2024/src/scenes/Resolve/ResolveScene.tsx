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

export default function ResolveScene() {
  const currentStep = useDataResolve((s) => s.step)

  // useEffect(() => {}, [])

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
