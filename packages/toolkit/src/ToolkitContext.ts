import {
  RefObject,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { pluginsBundle } from './tweakpane-plugins/bundle'

const isDev = !!import.meta.env.DEV

interface IToolkitContext {
  pane: Pane | null
}

export const ToolkitContext = createContext<IToolkitContext | null>(null)

export function useToolkitProviderData(
  containerRef: RefObject<HTMLDivElement | null>
): IToolkitContext {
  const [pane, setPane] = useState<Pane | null>(null)

  useLayoutEffect(() => {
    if (!isDev || !containerRef.current) return

    const pane = new Pane({
      title: 'Rewind Toolkit',
      container: containerRef.current
    })
    pane.registerPlugin(EssentialsPlugin)
    pane.registerPlugin(pluginsBundle)

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
