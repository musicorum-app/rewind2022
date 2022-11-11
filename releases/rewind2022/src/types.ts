export type KeysWithValsOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P
}

export enum RewindScene {
  YearSplash = 'YearSplash',
  FirstTrack = 'FirstTrack'
}

export const rewindScenes = [RewindScene.YearSplash, RewindScene.FirstTrack]
