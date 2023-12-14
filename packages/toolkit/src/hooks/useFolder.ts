import { useEffect, useLayoutEffect, useRef } from 'react'
import { useToolkitContext } from '../ToolkitContext'
import { FolderApi, FolderParams } from 'tweakpane'

export function useFolder(params: FolderParams) {
  const toolkit = useToolkitContext()

  const folderRef = useRef<FolderApi | null>(null)

  useEffect(() => {
    const folder = folderRef.current
    if (!folder) return

    folder.disabled = params.disabled ?? folder.disabled
    folder.expanded = params.expanded ?? folder.expanded
    folder.hidden = params.hidden ?? folder.hidden
    folder.title = params.title
  }, [params.disabled, params.expanded, params.hidden, params.title])

  useLayoutEffect(() => {
    const pane = toolkit.pane
    if (!pane) return

    folderRef.current = pane.addFolder(params)

    return () => {
      folderRef.current?.dispose()
    }
  }, [])

  return folderRef
}
