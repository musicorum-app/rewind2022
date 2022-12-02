import gsap from 'gsap'
import { Map } from 'immutable'
import create from 'zustand'

interface AudioEntry {
  audio: HTMLAudioElement
  name: string
}

export interface PlayerStore {
  active: boolean
  isPlaying: boolean
  setActive: (value: boolean) => void

  audios: Map<string, AudioEntry>
  nowPlaying: string | null

  setAudio: (key: string, url: string, name: string) => void
  playAudio: (key: string) => void
}

export const usePlayer = create<PlayerStore>((set, get) => ({
  active: true,
  isPlaying: false,

  setActive: (value) => {
    const { audios, nowPlaying } = get()
    set({ active: value })
    if (value && nowPlaying) {
      const currentPlayingAudio = audios.get(nowPlaying)
      if (currentPlayingAudio) {
        const audio = currentPlayingAudio?.audio
        if (audio.currentTime > audio.duration - 2) {
          audio.currentTime = 0
        }

        audio.volume = 0
        audio.play()
        gsap.to(audio, {
          volume: 1,
          duration: 0.7
        })

        gsap.to(audio, {
          volume: 0,
          duration: 0.7,
          delay: audio.duration - audio.currentTime - 1
        })
      }
    } else if (nowPlaying) {
      const currentPlayingAudio = audios.get(nowPlaying)
      if (currentPlayingAudio) {
        const audio = currentPlayingAudio?.audio

        gsap.to(audio, {
          volume: 0,
          duration: 0.7,
          onComplete: () => {
            audio.pause()
          }
        })
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
            audio: new Audio(url),
            name
          })
        }
      }
    })
  },
  playAudio: async (key) => {
    const { audios, active, nowPlaying } = get()
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
          await gsap
            .to(nowPlayingAudio.audio, {
              volume: 0,
              duration: 0.7
            })
            .then()
          audio.audio.pause()
        }
      }
      audio.audio.currentTime = 0
      audio.audio.volume = 0
      if (active) {
        audio.audio.play()
        gsap.to(audio.audio, {
          volume: 1,
          duration: 0.7
        })

        console.log(audio.audio.duration - 1)

        gsap.to(audio.audio, {
          volume: 0,
          duration: 0.7,
          delay: (audio.audio.duration || 30) - 1
        })
      }
    }
  }
}))
