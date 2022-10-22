import { useState } from 'react'
import SplashScene from './scenes/Splash/SplashScene'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/800.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return <SplashScene />
}

export default App
