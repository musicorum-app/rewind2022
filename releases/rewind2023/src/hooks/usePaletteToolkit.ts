import { useLayoutEffect, useRef, useState } from 'react'
import { Palette, PaletteType, Palettes } from '../theme/colors'
import { RewindScene } from '../types'
import { useScenePane } from './useScenePane'
import { Palette as PluginPalette } from '@rewind/toolkit/src/tweakpane-plugins/palette-plugin/types'

const availablePalettes = Object.entries(Palettes).map<PluginPalette>(
  ([name, p]) => ({
    color: p.color,
    darkerColor: p.darkerColor,
    name
  })
)

export function usePaletteToolkit(
  scene: RewindScene,
  defaultPalette: PaletteType
) {
  const folder = useScenePane(scene)
  const objectValue = useRef({
    palette: availablePalettes.find((p) => p.name === defaultPalette)
  })

  const [value, setValue] = useState(defaultPalette)

  useLayoutEffect(() => {
    const binding = folder.current?.addBinding(objectValue.current, 'palette', {
      view: 'palette-select',
      values: availablePalettes
    })

    binding?.on('change', (ev) => {
      setValue(ev.value?.name as PaletteType)
    })

    return () => {
      binding?.dispose()
    }
  }, [defaultPalette])

  return value
}
