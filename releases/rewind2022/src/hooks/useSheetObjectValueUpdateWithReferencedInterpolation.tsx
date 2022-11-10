import { RefObject, useEffect } from 'react'
import { ISheetObject } from '@theatre/core'
import {
  DomSheetObjectProps,
  useSheetObjectValueUpdate
} from '@rewind/core/src/hooks/useSheetObjectValueUpdate'
import useWindowResize from '@rewind/core/src/hooks/useWindowResize'
import { interpolateBetweenReferenceElements } from '../modules/referenceInterpolator'
import { KeysWithValsOfType } from '../types'
import { useDomSheetObjectValueUpdate } from '@rewind/core/src/hooks/useDomSheetObjectValueUpdate'

export default function useSheetObjectValueUpdateWithReferencedInterpolation<
  EL extends HTMLElement,
  O extends ISheetObject<DomSheetObjectProps>
>(
  originElementId: string,
  targetElementId: string,
  elementToInterpolate: EL | RefObject<EL>,
  sheetObject: O,
  objectKey: KeysWithValsOfType<O['value'], number>
) {
  const parseElements = () => {
    const originElement = document.getElementById(originElementId)
    const targetElement = document.getElementById(targetElementId)
    const element =
      'current' in elementToInterpolate
        ? elementToInterpolate.current
        : elementToInterpolate

    return {
      originElement,
      targetElement,
      element
    }
  }

  useDomSheetObjectValueUpdate(
    elementToInterpolate,
    sheetObject,
    (values, el) => {
      const { originElement, targetElement } = parseElements()
      if (originElement && targetElement) {
        interpolateBetweenReferenceElements(
          originElement,
          targetElement,
          el,
          values[objectKey]
        )
      }
    }
  )

  useWindowResize(() => {
    const { originElement, targetElement, element } = parseElements()

    if (originElement && targetElement && element) {
      interpolateBetweenReferenceElements(
        originElement,
        targetElement,
        element,
        // why the fuck do i need to cast this
        (sheetObject.value as O['value'])[objectKey]
      )
    }
  })

  useEffect(() => {
    const { originElement, targetElement, element } = parseElements()

    if (originElement && targetElement && element) {
      interpolateBetweenReferenceElements(
        originElement,
        targetElement,
        element,
        (sheetObject.value as O['value'])[objectKey]
      )
    }
  }, [])
}
