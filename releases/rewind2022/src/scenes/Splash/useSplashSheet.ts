import { getProject, IProject, ISheet, types } from '@theatre/core'
import create from 'zustand'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Gradients } from '../../theme/colors'
import projectState from './assets/state.json'

const project = getProject('Splash Scene', {
  state: projectState
})
const mainSheet = project.sheet('Main Sheet')

const continueSheet = project.sheet('Load Sheet')

const backgroundObject = mainSheet.object('Background gradient', {
  value: types.number(0, { range: [0, 1] })
})

const preloadObject = mainSheet.object('Preload', {
  opacity: types.number(1, { range: [0, 1] }),
  active: types.boolean(true)
})

const appObject = mainSheet.object('App', {
  opacity: types.number(0, { range: [0, 1] }),
  active: types.boolean(false)
})

const poweredObject = mainSheet.object('Powered by', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0)
})

const presentsObject = mainSheet.object('Musicorum presents', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0)
})

const rewindObject = mainSheet.object('Rewind text', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0),
  strokeOffset: types.number(0, { range: [0, 2000] }),
  rewindX: types.number(0),
  rewindOpacity: types.number(0, { range: [0, 1] }),
  yearX: types.number(0),
  yearOpacity: types.number(0, { range: [0, 1] })
})

const topTextObject = mainSheet.object('Top text', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0),
  scale: types.number(0, { range: [0, 3] })
})

const bottomTextObject = mainSheet.object('Bottom text', {
  opacity: types.number(0, { range: [0, 1] }),
  y: types.number(0),
  scale: types.number(0, { range: [0, 3] })
})

const buttonObject = mainSheet.object('Button', {
  opacity: types.number(0, { range: [0, 1] }),
  active: types.boolean(false)
})

const loadObject = continueSheet.object('Load container', {
  opacity: types.number(0, { range: [0, 1] }),
  x: types.number(0)
})

export interface SplashSheetStore {
  project: IProject
  sheet: ISheet
  loadSheet: ISheet
  preloadValues: typeof preloadObject.value
  appValues: typeof appObject.value
  poweredValues: typeof poweredObject.value
  presentsValues: typeof presentsObject.value
  rewindValues: typeof rewindObject.value
  topTextValues: typeof topTextObject.value
  bottomTextValues: typeof bottomTextObject.value
  buttonValues: typeof buttonObject.value
  loadValues: typeof loadObject.value
}

export const useSplashSheet = create<SplashSheetStore>((set) => {
  preloadObject.onValuesChange((preloadValues) => set({ preloadValues }))
  appObject.onValuesChange((appValues) => set({ appValues }))
  poweredObject.onValuesChange((poweredValues) => set({ poweredValues }))
  presentsObject.onValuesChange((presentsValues) => set({ presentsValues }))
  rewindObject.onValuesChange((rewindValues) => set({ rewindValues }))
  topTextObject.onValuesChange((topTextValues) => set({ topTextValues }))
  bottomTextObject.onValuesChange((bottomTextValues) =>
    set({ bottomTextValues })
  )
  buttonObject.onValuesChange((buttonValues) => set({ buttonValues }))
  loadObject.onValuesChange((loadValues) => set({ loadValues }))

  backgroundObject.onValuesChange((values) => {
    interpolateBackgroundGradient(
      Gradients.Burn,
      Gradients.MidnightSky,
      values.value
    )
  })

  return {
    project,
    sheet: mainSheet,
    loadSheet: continueSheet,
    preloadValues: preloadObject.value,
    appValues: appObject.value,
    poweredValues: poweredObject.value,
    presentsValues: presentsObject.value,
    rewindValues: rewindObject.value,
    topTextValues: topTextObject.value,
    bottomTextValues: bottomTextObject.value,
    buttonValues: buttonObject.value,
    loadValues: loadObject.value
  }
})
