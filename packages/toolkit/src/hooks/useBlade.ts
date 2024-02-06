import { useEffect, useRef } from 'react'
import { useToolkitContext } from '../ToolkitContext'
import { BaseBladeParams, BladeApi } from 'tweakpane'
import { ContainerApi } from '@tweakpane/core'

export function useBlade<
  BAPI extends BladeApi,
  BParams extends BaseBladeParams
>(
  params: BParams,
  callback?: (blade: BAPI) => void,
  container?: ContainerApi | null
) {
  const toolkit = useToolkitContext()

  const bladeRef = useRef<BladeApi | null>(null)

  useEffect(() => {
    if (!toolkit.pane) return
    container ||= toolkit.pane
    const blade = container.addBlade(params) as BAPI

    bladeRef.current = blade

    callback?.(blade)

    return () => blade.dispose()
  }, [container, toolkit.pane, params])
}
