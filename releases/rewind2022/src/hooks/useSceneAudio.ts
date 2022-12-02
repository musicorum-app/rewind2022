import { useEffect } from 'react'
import { RewindScene } from '../types'
import { usePlayer } from './usePlayer'

export function useSceneAudio(
  scene: RewindScene,
  url?: string | null,
  name?: string | null
) {
  const setAudio = usePlayer((s) => s.setAudio)

  useEffect(() => {
    if (url && name) {
      setAudio(scene, url, name)
    }
  }, [url, name])
}
