import { getProject } from '@theatre/core'
import projectState from '../assets/projectState.json'
import { RewindScene } from '../types'

const rewindProject = getProject('Rewind 2022', {
  state: projectState
})

export const mainSheet = rewindProject.sheet('Main Sheet')

type Range = [number, number]

export interface SceneTiming {
  forward: Range
  back: Range
}

export const sceneTimings: Record<RewindScene, SceneTiming> = {
  YearSplash: {
    forward: [0, 3.1],
    back: [6, 7]
  },
  FirstTrack: {
    forward: [4, 5],
    back: [0, 3]
  }
}
