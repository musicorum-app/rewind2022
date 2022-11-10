import { getProject } from '@theatre/core'
import projectState from '../assets/projectState.json'

const rewindProject = getProject('Rewind 2022', {
  state: projectState
})

export const mainSheet = rewindProject.sheet('Main Sheet')

type Range = [number, number]

export const sceneTimings = {
  yearSplash: {
    forward: [0, 3.1] as Range
  },
  firstTrack: {
    forward: [4, 5] as Range
  }
}

// @ts-expect-error sim
window.player = {
  one: () =>
    mainSheet.sequence.play({ range: sceneTimings.yearSplash.forward }),
  two: () => mainSheet.sequence.play({ range: sceneTimings.firstTrack.forward })
}
