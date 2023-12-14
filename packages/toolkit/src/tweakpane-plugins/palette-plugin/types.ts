import { BaseInputParams, Value, ViewProps } from '@tweakpane/core'

export interface PaletteSelectConfig {
  value: Value<Palette>
  viewProps: ViewProps
}

export interface PaletteSelectParams extends BaseInputParams {
  values: Palette[]
  view: 'palette-select'
}

export interface Palette {
  name: string
  darkerColor: string
  color: string
}
