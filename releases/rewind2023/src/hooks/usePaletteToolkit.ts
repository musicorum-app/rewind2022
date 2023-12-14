import { useLayoutEffect, useRef } from 'react'
import { Palette } from '../theme/colors'
import { RewindScene } from '../types'
import { useScenePane } from './useScenePane'

export function usePaletteToolkit(scene: RewindScene, defaultPalette: Palette) {
  const folder = useScenePane(scene)
  const objectValue = useRef({
    palette: {
      ...defaultPalette,
      name: 'test'
    }
  })

  useLayoutEffect(() => {
    const binding = folder.current?.addBinding(objectValue.current, 'palette', {
      view: 'palette-select',
      values: [
        {
          ...defaultPalette,
          name: 'test'
        }
      ]
    })

    return () => {
      binding?.dispose()
    }
  }, [defaultPalette])
}
