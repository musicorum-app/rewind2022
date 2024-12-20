import create from 'zustand'

interface TimelineController {
  currentTimeline: gsap.core.Timeline | null

  setTimeline: (timeline: gsap.core.Timeline | null) => void
}

export const useTimelineController = create<TimelineController>((set) => ({
  currentTimeline: null,

  setTimeline: (timeline) => set({ currentTimeline: timeline })
}))
