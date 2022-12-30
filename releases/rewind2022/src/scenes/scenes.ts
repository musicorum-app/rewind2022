import create from 'zustand'
import { Map } from 'immutable'
import { RewindScene } from '../types'
import { useTimelineController } from '../hooks/useTimelineController'

export interface Timeline {
  id: string
  factory: () => gsap.core.Timeline
}

export interface SceneTimelines {
  forward?: Timeline
  backward?: Timeline
}

interface ScenesStore {
  timelines: Map<RewindScene, SceneTimelines>

  setTimelines: (
    scene: RewindScene,
    timelines: SceneTimelines,
    autoReplace?: boolean
  ) => void
}

const getTimelineId = (tl?: gsap.core.Timeline | null) =>
  tl?.data?.id as string | undefined

export const scenesStore = create<ScenesStore>((set) => ({
  timelines: Map(),

  setTimelines: (scene, timelines, autoReplace = true) =>
    set((p) => {
      if (import.meta.env.DEV) {
        const timelineController = useTimelineController.getState()
        console.log(timelineController.currentTimeline)
        console.log(getTimelineId(timelineController.currentTimeline))

        if (
          autoReplace &&
          timelines.forward &&
          getTimelineId(timelineController.currentTimeline) ===
            timelines.forward.id
        ) {
          const tl = timelines.forward.factory()
          timelineController.setTimeline(tl)
          tl.play()
        } else if (
          autoReplace &&
          timelines.backward &&
          getTimelineId(timelineController.currentTimeline) ===
            timelines.backward.id
        ) {
          const tl = timelines.backward.factory()
          timelineController.setTimeline(tl)
          tl.play()
        }
      }

      return { timelines: p.timelines.set(scene, timelines) }
    })
}))
