import {
  ISheetObject,
  types,
  UnknownShorthandCompoundProps
} from '@theatre/core'
import { CSSProperties } from 'react'

export function createDomSheetObjectProps(opt?: UnknownShorthandCompoundProps) {
  return {
    opacity: types.number(1, { range: [0, 1] }),
    position: types.compound({
      x: types.number(0),
      y: types.number(0),
      z: types.number(0)
    }),
    scale: types.number(1, { range: [0, 5] }),
    visible: types.boolean(true),
    active: types.boolean(true),
    ...opt
  }
}

export interface ObjectValuesModel {
  opacity: number
  position: {
    x: number
    y: number
    z: number
  }
  scale: number
  visible: boolean
  active: boolean
}

export function sheetObjectValuesToStyle(v: ObjectValuesModel): CSSProperties {
  return {
    opacity: v.opacity,
    visibility: v.visible ? 'visible' : 'hidden',
    display: v.active ? 'unset' : 'none',
    transform: `translateX(${v.position.x}px) translateY(${v.position.y}px) translateZ(${v.position.z}px) scale(${v.scale})`
  }
}
