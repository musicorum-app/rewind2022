import { Config, View } from '@tweakpane/core'
import { PaletteSelectConfig } from './types'

export class PaletteSelectView implements View {
  public readonly element: HTMLElement

  constructor(doc: Document, config: PaletteSelectConfig) {
    this.element = doc.createElement('div')
    const palette = config.value.rawValue
    this.element.innerHTML = palette.name

    this.element.style.width = '100%'
    this.element.style.background = palette.darkerColor
    this.element.style.color = palette.color
  }
}
