import LastClient from '@musicorum/lastfm'

export const lastfmClient = new LastClient(import.meta.env.VITE_LASTFM_KEY)

export function getLargeLastfmImage(url: string) {
  return url.replace('/300x300/', '/500x500/')
}
