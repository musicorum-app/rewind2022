import LastClient from '@musicorum/lastfm'

export const lastfmClient = new LastClient(import.meta.env.VITE_LASTFM_KEY)
