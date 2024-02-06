import { useRef } from 'react'
import { RewindScene } from '../types'
import { useFolder } from '@rewind/toolkit'
import { useOrchestrator } from './useOrchestrator'

export function useScenePane(scene: RewindScene) {
  const currentScene = useOrchestrator((s) => s.scene)

  const folder = useFolder({
    title: scene,
    expanded: true,
    hidden: currentScene !== scene,
    index: 10
  })

  return folder
}
