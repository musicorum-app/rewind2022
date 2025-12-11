import i18next, { ReadCallback, ResourceKey } from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

function loadLocale(module: Promise<ResourceKey>, callback: ReadCallback) {
  module
    .then((resource) => callback(null, resource))
    .catch((err) => callback(err, null))
}

const resourcesLoader = resourcesToBackend((language, _, callback) => {
  console.log(language)
  if (language === 'pt-BR') {
    loadLocale(import('./langs/pt-BR.json'), callback)
  } else if (language === 'en-US') {
    loadLocale(import('./langs/en-US.json'), callback)
  } else if (language === 'es-ES') {
    loadLocale(import('./langs/es-ES.json'), callback)
  } else {
    callback(new Error('Unsuported locale'), null)
  }
})

i18next
  .use(resourcesLoader)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false
    }
  })

export default i18next
