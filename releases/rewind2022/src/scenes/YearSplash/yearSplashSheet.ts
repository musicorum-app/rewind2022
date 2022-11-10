import { createDomSheetObjectProps, createSheetObject } from '@rewind/core/src/modules/sheetObject'
import { getProject, types } from '@theatre/core'
import { createMainControllerObject } from '../../modules/sheets'
import yearSplashScene from './assets/yearSplashScene.json'

const project = getProject('Year Splash Scene', {
  state: yearSplashScene
})

export const yearSplashSheet = project.sheet('Intro')

const mainObject = yearSplashSheet.object(
  'Main Controller',
  createMainControllerObject()
)

const yearGroupObject = yearSplashSheet.object(
  'Year group',
  createDomSheetObjectProps()
)

const yearDigit1Object = yearSplashSheet.object(
  'Year digit 1',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const yearDigit1Objects = createSheetObject(
  'Year digit 1',
  [yearSplashSheet],
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  }))

const yearDigit2Object = yearSplashSheet.object(
  'Year digit 2',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const yearDigit3Object = yearSplashSheet.object(
  'Year digit 3',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const yearDigit4Object = yearSplashSheet.object(
  'Year digit 4',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const backImage1Object = yearSplashSheet.object(
  'Back Image 1',
  createDomSheetObjectProps()
)

const backImage2Object = yearSplashSheet.object(
  'Back Image 2',
  createDomSheetObjectProps()
)

const backImage3Object = yearSplashSheet.object(
  'Back Image 3',
  createDomSheetObjectProps()
)

const backImage4Object = yearSplashSheet.object(
  'Back Image 4',
  createDomSheetObjectProps()
)

const backImage5Object = yearSplashSheet.object(
  'Back Image 5',
  createDomSheetObjectProps()
)

const bottomTextObject = yearSplashSheet.object(
  'Bottom Text',
  createDomSheetObjectProps()
)

const firstTrackObject = yearSplashSheet.object(
  'First Track',
  createDomSheetObjectProps({
    transitionInterpolation: types.number(0, { range: [0, 1] })
  })
)

export const yearSplashObjects = {
  mainObject,

  yearGroupObject,

  firstTrackObject,

  yearDigit1Object,
  yearDigit2Object,
  yearDigit3Object,
  yearDigit4Object,

  bottomTextObject,

  backImage1Object,
  backImage2Object,
  backImage3Object,
  backImage4Object,
  backImage5Object
}
