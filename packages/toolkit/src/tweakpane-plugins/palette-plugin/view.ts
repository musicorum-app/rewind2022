import { Config, Value, View } from '@tweakpane/core'
import { Palette, PaletteSelectConfig } from './types'
import './styles.scss'

export class PaletteSelectView implements View {
  public readonly element: HTMLElement
  private buttonElement: HTMLButtonElement
  private boxElement: HTMLDivElement
  private textElement: HTMLSpanElement
  private popoverElement: HTMLDivElement
  private value: Value<Palette>

  constructor(doc: Document, config: PaletteSelectConfig) {
    this.element = doc.createElement('div')
    this.element.classList.add('palette-select-blade')

    this.buttonElement = doc.createElement('button')
    this.buttonElement.classList.add('palette-button')
    this.element.appendChild(this.buttonElement)

    this.boxElement = doc.createElement('div')
    this.boxElement.classList.add('palette-box')
    this.buttonElement.appendChild(this.boxElement)

    this.textElement = doc.createElement('span')
    this.textElement.classList.add('palette-name')
    this.buttonElement.appendChild(this.textElement)

    this.popoverElement = doc.createElement('div')
    this.popoverElement.classList.add('palette-popover')
    // @ts-expect-error outdated type
    this.popoverElement.popover = 'auto'
    this.element.appendChild(this.popoverElement)

    // @ts-expect-error outdated type
    this.buttonElement.popoverTargetElement = this.popoverElement
    // @ts-expect-error outdated type
    this.buttonElement.popoverTargetAction = 'show'

    this.buttonElement.onclick = () => {
      const bounding = this.buttonElement.getBoundingClientRect()
      const anchorX = bounding.x + bounding.width / 2
      const anchorY = bounding.y + bounding.height

      this.popoverElement.style.setProperty('--anchor-x', anchorX + 'px')
      this.popoverElement.style.setProperty('--anchor-y', anchorY + 'px')
      // this.popoverElement.togglePopover()
    }

    this.createPaletteButtons(config.params.values)

    this.value = config.value
    this.value.emitter.on('change', () => this.updateValue())
    this.updateValue()

    config.viewProps.handleDispose(() => {
      this.element.remove()
    })
  }

  updateValue() {
    const palette = this.value.rawValue
    this.element.style.setProperty('--palette-main-color', palette.color)
    this.element.style.setProperty(
      '--palette-darker-color',
      palette.darkerColor
    )
    this.textElement.innerText = palette.name
  }

  createPaletteButtons(palettes: Palette[]) {
    for (const palette of palettes) {
      const button = this.element.ownerDocument.createElement('button')
      button.classList.add('palette-item')
      button.style.setProperty('--palette-item-main-color', palette.color)
      button.style.setProperty(
        '--palette-item-darker-color',
        palette.darkerColor
      )

      button.addEventListener('click', () => {
        this.value.rawValue = palette
      })

      const inner = this.element.ownerDocument.createElement('div')
      inner.classList.add('palette-item__inner')
      button.appendChild(inner)

      this.popoverElement.appendChild(button)
    }
  }
}
