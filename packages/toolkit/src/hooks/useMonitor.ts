import { BaseBladeParams, BladeApi } from 'tweakpane'
import { useToolkitContext } from '../ToolkitContext'
import { useEffect, useRef, useState } from 'react'
import { BindingApi } from '@tweakpane/core'

export function useMonitor<
  BAPI extends BindingApi,
  BParams extends BaseBladeParams
>(value: unknown, params: BParams, callback?: (blade: BAPI) => void) {
  const toolkit = useToolkitContext()

  const valueRef = useRef({
    value
  })
  const [bladeState, setBlade] = useState<BladeApi | null>(null)

  useEffect(() => {
    if (!toolkit.pane) return
    const blade = toolkit.pane.addBinding(
      valueRef.current,
      'value',
      params
    ) as BAPI

    setBlade(blade)

    callback?.(blade)

    return () => {
      blade.dispose()
    }
  }, [toolkit.pane])

  useEffect(() => {
    valueRef.current.value = value
  }, [value, bladeState])
}
