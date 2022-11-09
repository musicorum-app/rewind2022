import { ISheetObject } from '@theatre/core'
import { RefObject, useEffect } from 'react'
import {
  createDomSheetObjectProps,
  sheetObjectValuesToImperativeStyle
} from '../modules/sheetObject'
import { useSheetObjectValueUpdate } from './useSheetObjectValueUpdate'

export type DomSheetObjectProps = ReturnType<typeof createDomSheetObjectProps>

export function useDomSheetObjectValueUpdate<
  EL extends HTMLElement,
  O extends ISheetObject<DomSheetObjectProps>
>(
  ref: RefObject<EL> | EL,
  objects: O | O[],
  extraCallback?: (values: O['value'], element: EL) => void
) {
  useSheetObjectValueUpdate(ref, objects, (values, el) => {
    sheetObjectValuesToImperativeStyle(values, el.style, [])
    if (extraCallback) {
      extraCallback(values, el)
    }
  })
}
