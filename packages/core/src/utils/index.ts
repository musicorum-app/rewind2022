export type Range = [number, number]

export function mapValue(value: number, rangeIn: Range, rangeOut: Range) {
  return (
    ((value - rangeIn[0]) * (rangeOut[1] - rangeOut[0])) /
      (rangeIn[1] - rangeIn[0]) +
    rangeOut[0]
  )
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

export function mapValueAndClamp(
  value: number,
  rangeIn: Range,
  rangeOut: Range
) {
  return clamp(mapValue(value, rangeIn, rangeOut), ...rangeOut)
}

export function downloadFile(blob: Blob, name: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  document.getElementById('preload')?.appendChild(a)
  a.click()
  document.getElementById('preload')?.removeChild(a)
}
