import { ReactNode, useRef } from 'react'
import { ToolkitContext, useToolkitProviderData } from '../ToolkitContext'
import styled from '@emotion/styled'

const PaneContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 60px;
  z-index: 9999999;
  width: 260px;
`

interface ToolkitProviderProps {
  children: ReactNode
}

export function ToolkitProvider({ children }: ToolkitProviderProps) {
  const paneContainerRef = useRef<HTMLDivElement | null>(null)

  const data = useToolkitProviderData(paneContainerRef)

  return (
    <ToolkitContext.Provider value={data}>
      <PaneContainer ref={paneContainerRef} />
      {children}
    </ToolkitContext.Provider>
  )
}
