import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import studio from '@theatre/studio'

// Vite
if (import.meta.env.DEV) {
  studio.initialize()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
