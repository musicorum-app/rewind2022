import {
  createDomSheetObjectProps,
  createSheetObject
} from '@rewind/core/src/modules/sheetObject'
import { getProject, types } from '@theatre/core'
import { createMainControllerObject } from '../../modules/sheets'
import { mainSheet } from '../scenes'

const mainObject = mainSheet.object(
  'Main Controller',
  createMainControllerObject()
)

const yearGroupObject = mainSheet.object(
  'Year group',
  createDomSheetObjectProps()
)

const yearDigit1Object = mainSheet.object(
  'Year digit 1',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const yearDigit2Object = mainSheet.object(
  'Year digit 2',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const yearDigit3Object = mainSheet.object(
  'Year digit 3',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const yearDigit4Object = mainSheet.object(
  'Year digit 4',
  createDomSheetObjectProps({
    weight: types.number(500, { range: [0, 800] })
  })
)

const backImage1Object = mainSheet.object(
  'Back Image 1',
  createDomSheetObjectProps()
)

const backImage2Object = mainSheet.object(
  'Back Image 2',
  createDomSheetObjectProps()
)

const backImage3Object = mainSheet.object(
  'Back Image 3',
  createDomSheetObjectProps()
)

const backImage4Object = mainSheet.object(
  'Back Image 4',
  createDomSheetObjectProps()
)

const backImage5Object = mainSheet.object(
  'Back Image 5',
  createDomSheetObjectProps()
)

const bottomTextObject = mainSheet.object(
  'Bottom Text',
  createDomSheetObjectProps()
)

const firstTrackObject = mainSheet.object(
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
