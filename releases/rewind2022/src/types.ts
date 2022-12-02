import { RewindData } from '@rewind/resolver/src/types'

export type KeysWithValsOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P
}

export enum RewindScene {
  YearSplash = 'YearSplash',
  FirstTrack = 'FirstTrack',
  Scrobbles = 'Scrobbles'
}

export const rewindScenes = [
  RewindScene.YearSplash,
  RewindScene.FirstTrack,
  RewindScene.Scrobbles
]

export interface RewindCache {
  data: RewindData
  version: number
}
