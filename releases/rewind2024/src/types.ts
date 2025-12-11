import { RewindData } from '@rewind/resolver/src/types'

export type KeysWithValsOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P
}

export enum RewindScene {
  YearSplash = 'YearSplash',
  FirstTrack = 'FirstTrack',
  Scrobbles = 'Scrobbles',
  ScrobblesChartScene = 'ScrobblesChartScene',
  ScrobblesDetailsScene = 'ScrobblesDetailsScene',
  TopArtistsScene = 'TopArtistsScene',
  TopTracksScene = 'TopTracksScene',
  TopAlbumsScene = 'TopAlbumsScene',
  CollageScene = 'CollageScene',
  ArtistShareScene = 'ArtistShareScene',
  TagCloudScene = 'TagCloudScene',
  PopularityScene = 'PopularityScene',
  EndSplashScene = 'EndSplashScene',
  PlaylistScene = 'PlaylistScene',
  ShareScene = 'ShareScene',
  FinishScene = 'FinishScene'
}

export const rewindScenes = [
  RewindScene.YearSplash,
  RewindScene.FirstTrack,
  RewindScene.Scrobbles,
  RewindScene.ScrobblesChartScene,
  RewindScene.ScrobblesDetailsScene,
  RewindScene.TopArtistsScene,
  RewindScene.TopTracksScene,
  RewindScene.TopAlbumsScene,
  RewindScene.CollageScene,
  RewindScene.ArtistShareScene,
  RewindScene.TagCloudScene,
  RewindScene.PopularityScene,
  RewindScene.EndSplashScene,
  RewindScene.PlaylistScene,
  RewindScene.ShareScene,
  RewindScene.FinishScene
]

export interface RewindCache {
  data: RewindData
  version: number
}
