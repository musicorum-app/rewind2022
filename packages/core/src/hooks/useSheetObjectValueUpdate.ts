import { ISheetObject } from '@theatre/core'
import { RefObject, useEffect } from 'react'
import {
  createDomSheetObjectProps,
  sheetObjectValuesToImperativeStyle
} from '../modules/sheetObject'

type ObjectProps = ReturnType<typeof createDomSheetObjectProps>

export function useSheetObjectValueUpdate<
  EL extends HTMLElement,
  O extends ISheetObject<ObjectProps>
>(
  ref: RefObject<EL>,
  object: O,
  extraCallback?: (values: O['value'], element: EL) => void
) {
  useEffect(() => {
    const el = ref.current
    if (el) {
      const unsubscribe = object.onValuesChange((values) => {
        sheetObjectValuesToImperativeStyle(values, el.style, [])
        if (extraCallback) {
          extraCallback(values, el)
        }
      })

      return unsubscribe
    }
  }, [ref])
}
