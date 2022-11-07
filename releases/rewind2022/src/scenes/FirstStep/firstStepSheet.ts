import { getProject } from '@theatre/core'
import { createMainControllerObject } from '../../modules/sheets'

const project = getProject('First Step Scene', {
  state: undefined
})

export const firstStepIntroSheet = project.sheet('Intro')

const mainObject = firstStepIntroSheet.object(
  'Main Controller',
  createMainControllerObject()
)

export const firstStepObjects = {
  mainObject
}
