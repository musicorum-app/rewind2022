import { ISheetObject, types } from '@theatre/core'
import { useEffect, useState } from 'react'
import { Gradient, Palettes } from '../theme/colors'
import { interpolateBackgroundGradient } from './backgroundGradient'

export function createMainControllerObject() {
  return {
    backgroundInterpolation: types.number(0, { range: [0, 1] }),
    pointerEvents: types.boolean(true)
  }
}

type MainControllerObjectType = ISheetObject<
  ReturnType<typeof createMainControllerObject>
>

export function useMainControllerObjectObserver(
  object: MainControllerObjectType,
  fromGradient: Gradient = Palettes.MidnightSky.gradient,
  toGradient: Gradient = Palettes.MidnightSky.gradient
) {
  const [pointerEvents, setPointerEvents] = useState(object.value.pointerEvents)

  useEffect(() => {
    const unsubscribe = object.onValuesChange((values) => {
      interpolateBackgroundGradient(
        fromGradient,
        toGradient,
        values.backgroundInterpolation
      )

      setPointerEvents(values.pointerEvents)
    })

    return unsubscribe
  }, [fromGradient, toGradient])

  return {
    pointerEvents
  }
}
