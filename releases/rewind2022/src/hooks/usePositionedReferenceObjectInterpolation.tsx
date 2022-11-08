import { useWindowSize } from './useWindowSize'

import { useMemo, useLayoutEffect, RefObject } from 'react'
import { mapValueBetweenRanges } from '../utils/math'

const interpolatePx = (origin: number, target: number, value: number) =>
  mapValueBetweenRanges([0, 1], [origin, target], value) + 'px'

export default function usePositionedReferenceObjectInterpolation(
  originElementId: string,
  targetElementId: string,
  elementToInterpolate: HTMLElement | RefObject<HTMLElement>,
  interpolation: number
) {
  const [windowWidth, windowHeight] = useWindowSize()

  const originMeasurements = useMemo(() => {
    const element = document.getElementById(originElementId)
    return element?.getBoundingClientRect() ?? new DOMRect(0, 0, 20, 20)
  }, [windowWidth, windowHeight])

  const targetMeasurements = useMemo(() => {
    const element = document.getElementById(targetElementId)
    return element?.getBoundingClientRect() ?? new DOMRect(0, 0, 20, 20)
  }, [windowWidth, windowHeight])

  useLayoutEffect(() => {
    const element =
      elementToInterpolate instanceof HTMLElement
        ? elementToInterpolate
        : elementToInterpolate.current

    if (element) {
      element.style.position = 'absolute'

      element.style.left = interpolatePx(
        originMeasurements.x,
        targetMeasurements.x,
        interpolation
      )
      element.style.top = interpolatePx(
        originMeasurements.y,
        targetMeasurements.y,
        interpolation
      )

      element.style.width = interpolatePx(
        originMeasurements.width,
        targetMeasurements.width,
        interpolation
      )
      element.style.height = interpolatePx(
        originMeasurements.height,
        targetMeasurements.height,
        interpolation
      )
    }
  }, [interpolation, originMeasurements, targetMeasurements])
}
