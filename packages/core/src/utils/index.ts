export function mapValue(
  value: number,
  rangeIn: [number, number],
  rangeOut: [number, number]
) {
  return (
    ((value - rangeIn[0]) * (rangeOut[1] - rangeOut[0])) /
      (rangeIn[1] - rangeIn[0]) +
    rangeOut[0]
  )
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}
