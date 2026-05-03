<script>
  import { modalStore } from '../lib/stores/modal.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';
  const t = (key) => i18nStore.t(key);
</script>

<div class="right-5 md:right-8 bottom-5 md:bottom-8 z-50 fixed flex flex-col gap-4 floating-buttons">
  <button
    class="flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl border-0 rounded-full w-12 md:w-15 h-12 md:h-15 text-white text-lg md:text-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
    title={t('discordCommunityBtn')}
    onclick={() => modalStore.openDiscord()}
  >
    <i class="fab fa-discord"></i>
  </button>

  <button
    class="flex justify-center items-center bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl border-0 rounded-full w-12 md:w-15 h-12 md:h-15 text-white text-lg md:text-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
    title="设置"
    onclick={() => modalStore.openSettings()}
  >
    <i class="fas fa-cog"></i>
  </button>
</div>
