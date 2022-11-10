import {
  ISheet,
  ISheetObject,
  types,
  UnknownShorthandCompoundProps
} from '@theatre/core'
import { CSSProperties } from 'react'

export function createDomSheetObjectProps<
  OPT extends UnknownShorthandCompoundProps
>(opt?: OPT) {
  const props = {
    opacity: types.number(1, { range: [0, 1] }),
    position: types.compound({
      x: types.number(0),
      y: types.number(0),
      z: types.number(0)
    }),
    scale: types.number(1, { nudgeMultiplier: 0.05 }),
    visible: types.boolean(true),
    active: types.boolean(true),
    pointerEvents: types.boolean(true)
  }
  return {
    ...props,
    ...opt
  } as typeof props & OPT
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
  pointerEvents: boolean
}

export function sheetObjectValuesToStyle(v: ObjectValuesModel): CSSProperties {
  return {
    opacity: v.opacity,
    visibility: v.visible ? 'visible' : 'hidden',
    display: v.active ? 'unset' : 'none',
    transform: `translateX(${v.position.x}px) translateY(${v.position.y}px) translateZ(${v.position.z}px) scale(${v.scale})`,
    pointerEvents: v.pointerEvents ? 'unset' : 'none'
  }
}

export function sheetObjectValuesToImperativeStyle(
  v: ObjectValuesModel,
  style: CSSStyleDeclaration,
  exclude: (keyof ObjectValuesModel)[]
) {
  style.willChange = 'transform'
  if (!exclude.includes('opacity')) style.opacity = v.opacity.toString()
  if (!exclude.includes('visible'))
    style.visibility = v.visible ? 'visible' : 'hidden'
  if (!exclude.includes('active')) style.display = v.active ? 'unset' : 'none'
  if (!exclude.includes('position'))
    style.transform = `translateX(${v.position.x}px) translateY(${v.position.y}px) translateZ(${v.position.z}px) scale(${v.scale})`
  if (!exclude.includes('pointerEvents'))
    style.pointerEvents = v.pointerEvents ? 'unset' : 'none'
}

export function createSheetObject<Props extends UnknownShorthandCompoundProps>(
  key: string,
  sheets: ISheet[],
  objectProps: Props
) {
  return sheets.map((s) => s.object(key, objectProps))
}
