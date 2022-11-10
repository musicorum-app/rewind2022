import { ISheetObject } from '@theatre/core'
import { RefObject } from 'react'
import { useSheetObjectValueUpdate } from './useSheetObjectValueUpdate'

export function useElementSheetObjectValueUpdate<
  EL extends HTMLElement,
  O extends ISheetObject
>(
  ref: RefObject<EL> | EL,
  object: O,
  callback: (values: O['value'], element: EL) => void
) {
  useSheetObjectValueUpdate(object, (values) => {
    const el = 'current' in ref ? ref.current : ref
    if (el) {
      callback(values, el)
    }
  })
}
