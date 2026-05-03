<script>
  import LanguageSwitch from './LanguageSwitch.svelte';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';

  const t = (key) => i18nStore.t(key);
</script>

<header class="relative bg-red-500 shadow-md p-4 sm:p-5 rounded-b-3xl text-white text-center">
  <LanguageSwitch />
  <a href="https://github.com/KirisameVanilla/TJA-Tatsujin-Web" target="_blank" rel="noopener"
    title={t('githubTitle')}
    class="top-1/2 right-3 sm:right-5 absolute text-white text-xl sm:text-2xl hover:scale-110 transition-transform -translate-y-1/2 duration-100 transform">
    <i class="fab fa-github"></i>
  </a>
  <h1 class="m-0 text-2xl sm:text-3xl">{t('headerTitle')}</h1>
</header>
