import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Vite
if (import.meta.env.DEV) {
  // import('@theatre/studio').then((studio) => {
  //   // studio.default.initialize()
  //   // @ts-expect-error force global variable
  //   window.studio = studio
  // })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
