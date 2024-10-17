import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./translation/en.json'), // Ensure path is correct
      },
      fr: {
        translation: require('./translation/fr.json'), // Ensure path is correct
      },
      es: {
        translation: require('./translation/es.json'), // Ensure path is correct
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already safeguards from XSS
    },
  });

export default i18n;
