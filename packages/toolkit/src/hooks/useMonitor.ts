import { BaseBladeParams, BladeApi } from 'tweakpane'
import { useToolkitContext } from '../ToolkitContext'
import { useEffect, useRef, useState } from 'react'
import { BindingApi, ContainerApi } from '@tweakpane/core'

export function useMonitor<
  BAPI extends BindingApi,
  BParams extends BaseBladeParams
>(
  value: unknown,
  params: BParams,
  callback?: (blade: BAPI) => void,
  container?: ContainerApi | null
) {
  const toolkit = useToolkitContext()

  const valueRef = useRef({
    value
  })
  const [bladeState, setBlade] = useState<BladeApi | null>(null)

  useEffect(() => {
    if (!toolkit.pane) return
    container ||= toolkit.pane
    const blade = container.addBinding(
      valueRef.current,
      'value',
      params
    ) as BAPI

    setBlade(blade)

    callback?.(blade)

    return () => {
      blade.dispose()
    }
  }, [container, toolkit.pane])

  useEffect(() => {
    valueRef.current.value = value
    // @ts-expect-error éeeee
    bladeState?.refresh?.()
  }, [value, bladeState])
}
