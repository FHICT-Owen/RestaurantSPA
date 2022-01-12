import en from './assets/i18n/en.json'
import nl from './assets/i18n/nl.json'

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages: {
    en: en,
    nl: nl,
  }
})
export default i18n