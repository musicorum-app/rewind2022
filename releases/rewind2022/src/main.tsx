import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://c714519938a445e6a86f58ddf79be948@o379578.ingest.sentry.io/6118400",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

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
