import { mapValueBetweenRanges } from '../utils/math'

const interpolatePx = (origin: number, target: number, value: number) =>
  mapValueBetweenRanges([0, 1], [origin, target], value) + 'px'

export function interpolateBetweenReferenceElements(
  originElement: HTMLElement,
  targetElement: HTMLElement,
  elementToInterpolate: HTMLElement,
  value: number
) {
  const originMeasurements = originElement.getBoundingClientRect()
  const targetMeasurements = targetElement.getBoundingClientRect()

  elementToInterpolate.style.position = 'absolute'

  const x = interpolatePx(originMeasurements.x, targetMeasurements.x, value)

  const y = interpolatePx(originMeasurements.y, targetMeasurements.y, value)

  elementToInterpolate.style.transform = `translate(${x}, ${y})`

  elementToInterpolate.style.width = interpolatePx(
    originMeasurements.width,
    targetMeasurements.width,
    value
  )
  elementToInterpolate.style.height = interpolatePx(
    originMeasurements.height,
    targetMeasurements.height,
    value
  )
}
