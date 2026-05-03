import translations from '../translations.js';

function detectLanguage() {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language || navigator.userLanguage;

  if (browserLanguage.startsWith('zh')) {
    return 'zh-CN';
  }

  if (browserLanguage.startsWith('ja')) {
    return 'ja';
  }

  return 'en';
}

function createI18nStore() {
  let language = $state(detectLanguage());

  function t(key) {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        break;
      }
    }

    return value || key;
  }

  function setLanguage(lang) {
    if (translations[lang]) {
      language = lang;
      localStorage.setItem('language', lang);
      document.title = t('title');
      document.documentElement.lang = lang;
    }
  }

  function formatFilesPackaged(count) {
    const prefix = t('filesPackagedPrefix');
    const suffix = t('filesPackaged');
    if (language === 'zh-CN') {
      return `${prefix} ${count} ${suffix}`;
    } else {
      return `${count} ${suffix}`;
    }
  }

  // Initialize document title
  document.title = t('title');

  return {
    get language() { return language; },
    t,
    setLanguage,
    formatFilesPackaged,
    detectLanguage
  };
}

export const i18nStore = createI18nStore();
