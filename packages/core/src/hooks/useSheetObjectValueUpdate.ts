import { ISheetObject } from '@theatre/core'
import { RefObject, useEffect } from 'react'
import {
  createDomSheetObjectProps,
  sheetObjectValuesToImperativeStyle
} from '../modules/sheetObject'

export type DomSheetObjectProps = ReturnType<typeof createDomSheetObjectProps>

export function useSheetObjectValueUpdate<
  EL extends HTMLElement,
  O extends ISheetObject
>(
  ref: RefObject<EL> | EL,
  objects: O | O[],
  callback: (values: O['value'], element: EL) => void
) {
  useEffect(() => {
    const el = 'current' in ref ? ref.current : ref
    if (el) {
      const objs = Array.isArray(objects) ? objects : [objects]
      const unsubscribes = objs.map((o) =>
        o.onValuesChange((values) => {
          callback(values, el)
        })
      )

      return () => unsubscribes.forEach((u) => u())
    }
  }, [ref])
}
