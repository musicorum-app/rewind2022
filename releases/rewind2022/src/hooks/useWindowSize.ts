import { useState, useLayoutEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight
  ])

  useLayoutEffect(() => {
    const listener = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  return size
}
