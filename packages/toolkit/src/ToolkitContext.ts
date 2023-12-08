import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

const isDev = !!import.meta.env.DEV

interface IToolkitContext {
  pane: Pane | null
}

export const ToolkitContext = createContext<IToolkitContext | null>(null)

export function useToolkitProviderData(): IToolkitContext {
  const [pane, setPane] = useState<Pane | null>(null)

  useLayoutEffect(() => {
    if (!isDev) return

    const pane = new Pane({
      title: 'Rewind Toolkit'
    })
    pane.registerPlugin(EssentialsPlugin)

    setPane(pane)

    return () => {
      console.log('disposed')
      setPane(null)
      pane.dispose()
    }
  }, [])

  return {
    pane
  }
}

export function useToolkitContext() {
  const context = useContext(ToolkitContext)

  if (!context) {
    throw new Error(
      'Context is invalid. Make sure to put it inside the ToolkitProvider'
    )
  }

  return context
}
