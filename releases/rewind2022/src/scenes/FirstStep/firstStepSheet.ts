import { createDomSheetObjectProps } from '@rewind/core/src/modules/sheetObject'
import { getProject, types } from '@theatre/core'
import { createMainControllerObject } from '../../modules/sheets'

const project = getProject('First Step Scene', {
  state: undefined
})

export const firstStepFromYearSplashSheet = project.sheet('From Year Splash')

const mainObject = firstStepFromYearSplashSheet.object(
  'Main Controller',
  createMainControllerObject()
)

const trackObject = firstStepFromYearSplashSheet.object(
  'First track',
  createDomSheetObjectProps({
    transitionInterpolation: types.number(0, { range: [0, 1] })
  })
)

const yearSplashContainerObject = firstStepFromYearSplashSheet.object(
  'Year splash',
  createDomSheetObjectProps()
)

export const firstStepFromYearSplashObjects = {
  mainObject,
  trackObject,
  yearSplashContainerObject
}
