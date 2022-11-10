import { ISheetObject } from '@theatre/core'
import { useEffect } from 'react'

export function useSheetObjectValueUpdate<O extends ISheetObject>(
  object: O,
  callback: (values: O['value']) => void
) {
  useEffect(() => {
    const unsubscribe = object.onValuesChange((values) => {
      callback(values)
    })

    return () => unsubscribe()
  }, [])
}
