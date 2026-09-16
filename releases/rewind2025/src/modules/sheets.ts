import { ISheetObject, types } from '@theatre/core'
import { useEffect, useState } from 'react'
import { Gradient, Palettes } from '../theme/colors'
import { interpolateBackgroundGradient } from './backgroundGradient'

export function createMainControllerObject() {
  return {
    backgroundInterpolation: types.number(0, { range: [0, 1] })
  }
}
