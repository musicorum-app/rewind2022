import { useLayoutEffect } from 'react'

export type WindowResizeCallback = (width: number, height: number) => void

export default function useWindowResize(callback: WindowResizeCallback) {
  useLayoutEffect(() => {
    const listener = () => {
      callback(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  })
}
