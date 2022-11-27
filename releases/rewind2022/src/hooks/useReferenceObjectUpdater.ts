import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import { useEffect } from 'react'
import { interpolateBetweenReferenceElements } from '../modules/referenceInterpolator'

export default function useReferenceObjectUpdater(
  originElementSelector: string,
  targetElementSelecter: string,
  elementToInterpolateSelector: string,
  extraDeps?: React.DependencyList
) {
  const windowSize = useWindowSize()
  const parseElements = () => {
    const originElement = document.querySelector<HTMLElement>(
      originElementSelector
    )
    const targetElement = document.querySelector<HTMLElement>(
      targetElementSelecter
    )
    const element = document.querySelector<HTMLElement>(
      elementToInterpolateSelector
    )

    return {
      originElement,
      targetElement,
      element
    }
  }

  useEffect(() => {
    const { originElement, targetElement, element } = parseElements()

    if (originElement && targetElement && element) {
      const dataValue = element.getAttribute('data-interpolation-value')
      const value = dataValue ? parseInt(dataValue) : 0
      console.debug('updating reference object ' + element)
      interpolateBetweenReferenceElements(
        originElement,
        targetElement,
        element,
        value
      )
    }
  }, [windowSize, ...(extraDeps || [])])
}
