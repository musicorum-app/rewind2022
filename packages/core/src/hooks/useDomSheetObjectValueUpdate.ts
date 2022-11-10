import { ISheetObject } from '@theatre/core'
import { RefObject, useEffect } from 'react'
import {
  createDomSheetObjectProps,
  sheetObjectValuesToImperativeStyle
} from '../modules/sheetObject'
import { useElementSheetObjectValueUpdate } from './useElementSheetObjectValueUpdate'

export type DomSheetObjectProps = ReturnType<typeof createDomSheetObjectProps>

export function useDomSheetObjectValueUpdate<
  EL extends HTMLElement,
  O extends ISheetObject<DomSheetObjectProps>
>(
  ref: RefObject<EL> | EL,
  object: O,
  extraCallback?: (values: O['value'], element: EL) => void
) {
  useElementSheetObjectValueUpdate(ref, object, (values, el) => {
    sheetObjectValuesToImperativeStyle(values, el.style, [])
    if (extraCallback) {
      extraCallback(values, el)
    }
  })
}
