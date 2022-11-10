import { createDomSheetObjectProps } from '@rewind/core/src/modules/sheetObject'
import { getProject, types } from '@theatre/core'
import { createMainControllerObject } from '../../modules/sheets'
import { mainSheet } from '../scenes'

const trackObject = mainSheet.object(
  'First track',
  createDomSheetObjectProps({
    transitionInterpolation: types.number(0, { range: [0, 1] })
  })
)

export const firstStepFromYearSplashObjects = {
  trackObject
}
