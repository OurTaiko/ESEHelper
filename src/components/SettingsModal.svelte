<script>
  import { themeStore } from '../lib/stores/theme.svelte.js';
  import { modalStore } from '../lib/stores/modal.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';

  const t = (key) => i18nStore.t(key);

  let themeIconClass = $derived(themeStore.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon');
  let themeStatusText = $derived(() => {
    if (themeStore.isAuto) {
      return themeStore.theme === 'dark' ? t('autoThemeNight') : t('autoThemeDay');
    } else {
      return themeStore.theme === 'dark' ? t('darkTheme') : t('lightTheme');
    }
  });

  let iconTransition = $state(false);

  function handleToggle() {
    themeStore.toggleTheme();
    iconTransition = true;
    setTimeout(() => { iconTransition = false; }, 300);
  }

  function handleAuto() {
    themeStore.setAutoTheme();
    iconTransition = true;
    setTimeout(() => { iconTransition = false; }, 300);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      modalStore.closeSettings();
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="fixed top-0 left-0 z-50 w-full h-full modal show"
  style="background: transparent; backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center;"
  onclick={handleOverlayClick}
  role="dialog"
  aria-modal="true"
>
  <div class="bg-white shadow-2xl rounded-xl w-[95%] sm:w-11/12 max-w-lg max-h-4/5 overflow-y-auto animate-fade-in modal-content">
    <div class="flex justify-between items-center p-4 sm:p-6 border-gray-200 border-b modal-header">
      <h3 class="m-0 font-semibold text-red-500 text-xl">{t('settingsTitle')}</h3>
      <span
        class="bg-transparent p-0 border-0 font-bold text-gray-400 hover:text-red-500 text-3xl leading-none transition-colors duration-300 cursor-pointer close"
        onclick={() => modalStore.closeSettings()}
      >
        &times;
      </span>
    </div>
    <div class="p-4 sm:p-6 modal-body">
      <div class="mb-8 config-section">
        <div class="mb-4 section-header">
          <h4 class="m-0 text-gray-800 text-lg">{t('themeSettings')}</h4>
        </div>
        <div class="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <div class="flex-1">
            <div class="flex items-center mb-1 font-medium text-gray-800">
              <i class="mr-2 fas fa-palette"></i>
              <span>{t('currentTheme')}</span>
            </div>
            <div class="text-gray-600 text-sm">
              <span>{themeStatusText()}</span>
            </div>
          </div>
          <div class="flex gap-2 min-w-[200px]">
            <button
              class="flex flex-1 items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 border-0 rounded-lg text-white text-sm whitespace-nowrap hover:scale-105 transition-all duration-200 cursor-pointer"
              onclick={handleToggle}
            >
              <i class={iconTransition ? `${themeIconClass} theme-transition` : themeIconClass} id="theme-icon"></i>
              <span>{t('toggleTheme')}</span>
            </button>
            <button
              class="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 px-3 py-2 border-0 rounded-lg text-white text-sm whitespace-nowrap hover:scale-105 transition-all duration-200 cursor-pointer"
              onclick={handleAuto}
            >
              <i class="fas fa-clock"></i>
              <span>{t('autoTheme')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
