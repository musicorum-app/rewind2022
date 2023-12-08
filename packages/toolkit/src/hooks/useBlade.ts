import { useEffect, useRef } from 'react'
import { useToolkitContext } from '../ToolkitContext'
import { BaseBladeParams, BladeApi } from 'tweakpane'

export function useBlade<
  BAPI extends BladeApi,
  BParams extends BaseBladeParams
>(params: BParams, callback?: (blade: BAPI) => void) {
  const toolkit = useToolkitContext()

  const bladeRef = useRef<BladeApi | null>(null)

  useEffect(() => {
    if (!toolkit.pane) return
    const blade = toolkit.pane.addBlade(params) as BAPI

    bladeRef.current = blade

    callback?.(blade)

    return () => blade.dispose()
  }, [toolkit.pane, params])
}
