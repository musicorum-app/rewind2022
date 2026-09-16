export type Range = [number, number]

export function mapValueBetweenRanges(r1: Range, r2: Range, value: number) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0]
}
