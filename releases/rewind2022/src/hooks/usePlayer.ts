import gsap from 'gsap'
import { Map } from 'immutable'
import create from 'zustand'
import { Howl } from 'howler'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface AudioEntry {
  audio: Howl
  name: string
}

export interface PlayerStore {
  active: boolean
  isPlaying: boolean
  setActive: (value: boolean) => void

  transitioning: boolean

  audios: Map<string, AudioEntry>
  nowPlaying: string | null

  setAudio: (key: string, url: string, name: string) => void
  playAudio: (key: string) => void
}

export const usePlayer = create<PlayerStore>((set, get) => ({
  active: true,
  isPlaying: false,
  transitioning: false,

  setActive: async (value) => {
    const { audios, nowPlaying, transitioning } = get()
    if (transitioning) return
    set({ active: value })
    if (value && nowPlaying) {
      const currentPlayingAudio = audios.get(nowPlaying)
      if (currentPlayingAudio) {
        const audio = currentPlayingAudio?.audio

        audio.seek(0)
        audio.fade(0, 1, 500)
        audio.play()
        console.log(audio)
        set({ transitioning: true })
        await delay(500)
        set({ transitioning: false })
      }
    } else if (nowPlaying) {
      const currentPlayingAudio = audios.get(nowPlaying)
      if (currentPlayingAudio) {
        const audio = currentPlayingAudio?.audio

        set({ transitioning: true })
        audio.fade(1, 0, 500)
        await delay(500)
        audio.pause()
        set({ transitioning: false })
      }
    }
  },

  audios: Map(),
  nowPlaying: null,

  setAudio: (key, url, name) => {
    set((s) => {
      if (s.audios.has(key)) {
        return {}
      } else {
        return {
          audios: s.audios.set(key, {
            audio: new Howl({
              src: url,
              html5: true,
              preload: true
            }),
            name
          })
        }
      }
    })
  },
  playAudio: async (key) => {
    const { audios, active, nowPlaying, transitioning } = get()
    if (transitioning) return
    console.log([...audios.entries()])
    const audio = audios.get(key)

    if (audio) {
      set({ nowPlaying: key })
      if (nowPlaying && active) {
        if (nowPlaying === key) {
          return
        }
        const nowPlayingAudio = audios.get(nowPlaying)
        console.log(nowPlayingAudio)
        if (nowPlayingAudio) {
          set({ transitioning: true })
          nowPlayingAudio.audio.fade(1, 0, 500)
          await delay(500)
          nowPlayingAudio.audio.stop()
          set({ transitioning: false })
        }
      }
      // audio.audio.currentTime = 0
      // audio.audio.volume = 0
      if (active) {
        set({ transitioning: true })
        audio.audio.fade(0, 1, 500)
        audio.audio.play()
        await delay(500)
        set({ transitioning: false })
      }
    }
  }
}))
