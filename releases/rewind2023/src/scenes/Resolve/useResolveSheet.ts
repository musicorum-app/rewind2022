import { getProject, IProject, ISheet } from '@theatre/core'
import { createDomSheetObjectProps } from '@rewind/core/src/modules/sheetObject'
import create from 'zustand'

const project = getProject('Resolve Scene')

const startSheet = project.sheet('Start')

const startObject = startSheet.object(
  'Start object',
  createDomSheetObjectProps()
)

export interface ResolveSheetStore {
  project: IProject
  startSheet: ISheet
  startValues: typeof startObject.value
}

export const useResolveSheet = create<ResolveSheetStore>((set) => {
  startObject.onValuesChange((startValues) => set({ startValues }))

  return {
    project,
    startSheet,
    startValues: startObject.value
  }
})
