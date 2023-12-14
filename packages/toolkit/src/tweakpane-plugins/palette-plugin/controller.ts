import { Controller, Value, ViewProps } from '@tweakpane/core'
import { PaletteSelectView } from './view'
import { Palette, PaletteSelectConfig } from './types'

export class PaletteSelectController implements Controller<PaletteSelectView> {
  public readonly value: Value<Palette>
  public readonly view: PaletteSelectView
  public readonly viewProps: ViewProps

  constructor(doc: Document, config: PaletteSelectConfig) {
    this.value = config.value
    this.viewProps = config.viewProps

    this.view = new PaletteSelectView(doc, config)
  }
}
