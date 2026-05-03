<script>
  import { modalStore } from '../lib/stores/modal.svelte.js';
  import { themeStore } from '../lib/stores/theme.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';

  const t = (key) => i18nStore.t(key);

  let discordTheme = $derived(themeStore.theme);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      modalStore.closeDiscord();
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  id="discord-modal"
  class="fixed top-0 left-0 z-50 w-full h-full modal show"
  style="background: transparent; backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center;"
  onclick={handleOverlayClick}
  role="dialog"
  aria-modal="true"
>
  <div class="bg-white shadow-2xl rounded-xl w-[95%] sm:w-11/12 max-w-md max-h-4/5 overflow-y-auto animate-fade-in modal-content">
    <div class="flex justify-between items-center p-4 sm:p-6 border-gray-200 border-b modal-header">
      <h3 class="m-0 font-semibold text-indigo-600 text-xl">
        <i class="mr-2 fab fa-discord"></i>
        <span>{t('discordCommunityTitle')}</span>
      </h3>
      <span
        class="bg-transparent p-0 border-0 font-bold text-gray-400 hover:text-indigo-600 text-3xl leading-none transition-colors duration-300 cursor-pointer close"
        onclick={() => modalStore.closeDiscord()}
      >
        &times;
      </span>
    </div>
    <div class="p-4 sm:p-6 modal-body">
      <div class="text-center">
        <p class="mb-6 text-gray-600">
          {t('discordCommunityDesc')}
        </p>
        <div class="flex justify-center">
          <div class="shadow-lg rounded-lg overflow-hidden">
            <iframe
              src="https://discord.com/widget?id=1242365489817194512&theme={discordTheme}"
              width="320" height="400"
              allowtransparency="true"
              title="Discord 社区卡片"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              class="border-0 rounded-lg"
            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
