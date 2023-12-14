import { InputBindingPlugin, createPlugin, parseRecord } from '@tweakpane/core'
import { Palette, PaletteSelectParams } from './types'
import { PaletteSelectController } from './controller'

type PaletteSelectPluginType = InputBindingPlugin<
  Palette,
  Palette,
  PaletteSelectParams
>

function parsePalette(value: unknown) {
  return parseRecord(value as Record<string, unknown>, (p) => ({
    name: p.required.string,
    color: p.required.string,
    darkerColor: p.required.string
  }))
}

export const PaletteSelectPlugin = createPlugin<PaletteSelectPluginType>({
  id: 'palette-select',
  type: 'input',
  accept(exValue, params) {
    if (!exValue) return null

    const initialValue = parsePalette(exValue)

    const parsedParams = parseRecord(params, (p) => ({
      view: p.required.constant<'palette-select'>('palette-select'),
      values: p.required.array(
        p.required.object({
          name: p.required.string,
          color: p.required.string,
          darkerColor: p.required.string
        })
      )
    }))

    if (!parsedParams || !initialValue) return null

    return {
      initialValue,
      params: parsedParams
    }
  },
  binding: {
    reader() {
      return (exValue: unknown): Palette => {
        return parsePalette(exValue)!
      }
    },
    writer() {
      return (target, inValue) => {
        target.write(inValue)
      }
    }
  },
  controller(args) {
    return new PaletteSelectController(args.document, {
      value: args.value,
      viewProps: args.viewProps
    })
  }
})
