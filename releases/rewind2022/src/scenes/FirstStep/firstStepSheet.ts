import { createDomSheetObjectProps } from '@rewind/core/src/modules/sheetObject'
import { getProject, types } from '@theatre/core'
import { createMainControllerObject } from '../../modules/sheets'

const project = getProject('First Step Scene', {
  state: undefined
})

export const firstStepIntroSheet = project.sheet('Intro')

const mainObject = firstStepIntroSheet.object(
  'Main Controller',
  createMainControllerObject()
)

const trackObject = firstStepIntroSheet.object(
  'Track Object',
  createDomSheetObjectProps({
    transitionInterpolation: types.number(0, { range: [0, 1] })
  })
)

export const firstStepObjects = {
  mainObject,
  trackObject
}
