import { ReactNode } from 'react'
import { ToolkitContext, useToolkitProviderData } from '../ToolkitContext'

interface ToolkitProviderProps {
  children: ReactNode
}

export function ToolkitProvider({ children }: ToolkitProviderProps) {
  const data = useToolkitProviderData()

  return (
    <ToolkitContext.Provider value={data}>{children}</ToolkitContext.Provider>
  )
}
