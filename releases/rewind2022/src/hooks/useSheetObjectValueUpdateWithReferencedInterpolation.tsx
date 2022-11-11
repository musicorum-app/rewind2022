import { RefObject, useEffect } from 'react'
import { ISheetObject } from '@theatre/core'
import useWindowResize from '@rewind/core/src/hooks/useWindowResize'
import { interpolateBetweenReferenceElements } from '../modules/referenceInterpolator'
import { KeysWithValsOfType } from '../types'
import {
  DomSheetObjectProps,
  useDomSheetObjectValueUpdate
} from '@rewind/core/src/hooks/useDomSheetObjectValueUpdate'

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
        el.setAttribute('data-interpolation-value', values[objectKey])
      }
    }
  )

  useWindowResize(() => {
    const { originElement, targetElement, element } = parseElements()

    if (originElement && targetElement && element) {
      const dataValue = element.getAttribute('data-interpolation-value')
      const value = dataValue ? parseInt(dataValue) : 0

      interpolateBetweenReferenceElements(
        originElement,
        targetElement,
        element,
        value
      )
    }
  })

  useEffect(() => {
    const { originElement, targetElement, element } = parseElements()
    console.debug('ue')

    if (originElement && targetElement && element) {
      const dataValue = element.getAttribute('data-interpolation-value')
      const value = dataValue ? parseInt(dataValue) : 0
      interpolateBetweenReferenceElements(
        originElement,
        targetElement,
        element,
        value
      )
    }
  })
}
