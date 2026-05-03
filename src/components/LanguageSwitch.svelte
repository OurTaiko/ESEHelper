<script>
  import { i18nStore } from '../lib/stores/i18n.svelte.js';

  let dropdownOpen = $state(false);

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function selectLanguage(lang) {
    i18nStore.setLanguage(lang);
    dropdownOpen = false;
  }

  function getLanguageText(lang) {
    switch (lang) {
      case 'zh-CN': return '中';
      case 'ja': return '日';
      case 'en': return 'EN';
      default: return 'EN';
    }
  }

  const t = (key) => i18nStore.t(key);
</script>

<div class="language-switch" onclick={(e) => e.stopPropagation()}>
  <button
    class="bg-white/20 border border-white/30 text-white px-3 py-2 rounded-md cursor-pointer flex items-center gap-1.5 text-sm transition-all duration-100 hover:bg-white/30 hover:scale-105"
    title={t('languageSwitch')}
    onclick={toggleDropdown}
  >
    <i class="fas fa-globe"></i>
    <span class="font-medium">{getLanguageText(i18nStore.language)}</span>
  </button>
  <div
    class="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg min-w-30 z-1000 transition-all duration-100 mt-2"
    class:opacity-0={!dropdownOpen}
    class:invisible={!dropdownOpen}
    class:-translate-y-2={!dropdownOpen}
    class:opacity-100={dropdownOpen}
    class:visible={dropdownOpen}
    class:translate-y-0={dropdownOpen}
  >
    <div
      class="px-4 py-2.5 text-gray-700 cursor-pointer transition-all duration-100 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
      class:bg-red-500={i18nStore.language === 'zh-CN'}
      class:text-white={i18nStore.language === 'zh-CN'}
      onclick={() => selectLanguage('zh-CN')}
    >
      <span class="font-medium">中文</span>
    </div>
    <div
      class="px-4 py-2.5 text-gray-700 cursor-pointer transition-all duration-100 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
      class:bg-red-500={i18nStore.language === 'ja'}
      class:text-white={i18nStore.language === 'ja'}
      onclick={() => selectLanguage('ja')}
    >
      <span class="font-medium">日本語</span>
    </div>
    <div
      class="px-4 py-2.5 text-gray-700 cursor-pointer transition-all duration-100 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
      class:bg-red-500={i18nStore.language === 'en'}
      class:text-white={i18nStore.language === 'en'}
      onclick={() => selectLanguage('en')}
    >
      <span class="font-medium">English</span>
    </div>
  </div>
</div>

<svelte:window onclick={() => { dropdownOpen = false; }} />
