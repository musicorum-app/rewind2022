const host = window.opener as Window | undefined
const hashContent = new URLSearchParams(location.hash.slice(1))
const queryContent = new URLSearchParams(location.search.slice(1))

const service = hashContent.get('state') || queryContent.get('state')

const token = hashContent.get('access_token')
host?.postMessage({
  service,
  token
})

window.close()

export {}
