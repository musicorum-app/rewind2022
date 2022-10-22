import { getProject, IProject, ISheet, types } from '@theatre/core'
import create from 'zustand'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Gradients } from '../../theme/colors'
import projectState from './assets/state.json'

const project = getProject('Splash', {
  state: projectState
})
const sheet = project.sheet('Main Sheet')

const backgroundObject = sheet.object('Background gradient', {
  value: types.number(0, { range: [0, 1] })
})

const preloadObject = sheet.object('Preload', {
  opacity: types.number(1, { range: [0, 1] }),
  active: types.boolean(true)
})

const appObject = sheet.object('App', {
  opacity: types.number(0, { range: [0, 1] }),
  active: types.boolean(false)
})

const poweredObject = sheet.object('Powered by', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0)
})

const presentsObject = sheet.object('Musicorum presents', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0)
})

const rewindObject = sheet.object('Rewind text', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0),
  strokeOffset: types.number(0, { range: [0, 2000] }),
  rewindX: types.number(0),
  rewindOpacity: types.number(0, { range: [0, 1] }),
  yearX: types.number(0),
  yearOpacity: types.number(0, { range: [0, 1] })
})

export interface SplashSheetStore {
  project: IProject
  sheet: ISheet
  preloadValues: typeof preloadObject.value
  appValues: typeof appObject.value
  poweredValues: typeof poweredObject.value
  presentsValues: typeof presentsObject.value
  rewindValues: typeof rewindObject.value
}

export const useSplashSheet = create<SplashSheetStore>((set) => {
  console.log('a')

  preloadObject.onValuesChange((preloadValues) => set({ preloadValues }))
  appObject.onValuesChange((appValues) => set({ appValues }))
  poweredObject.onValuesChange((poweredValues) => set({ poweredValues }))
  presentsObject.onValuesChange((presentsValues) => set({ presentsValues }))
  rewindObject.onValuesChange((rewindValues) => set({ rewindValues }))

  backgroundObject.onValuesChange((values) => {
    interpolateBackgroundGradient(
      Gradients.Burn,
      Gradients.MidnightSky,
      values.value
    )
  })

  return {
    project,
    sheet,
    preloadValues: preloadObject.value,
    appValues: appObject.value,
    poweredValues: poweredObject.value,
    presentsValues: presentsObject.value,
    rewindValues: rewindObject.value
  }
})
