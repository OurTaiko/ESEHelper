<script>
  import { searchStore } from '../lib/stores/search.svelte.js';
  import { statusStore } from '../lib/stores/status.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';
  import { downloadFilesFromStructure } from '../lib/utils/download.js';
  import { sendPreview } from '../lib/utils/preview.js';
  import { modalStore } from '../lib/stores/modal.svelte.js';

  let { aliasData } = $props();

  let downloading = $state(false);
  let previewing = $state(false);
  let disabled = $derived(!searchStore.selectedKey || downloading || previewing);

  const t = (key) => i18nStore.t(key);

  async function handleDownload() {
    if (!searchStore.selectedKey) return;
    downloading = true;
    statusStore.update(t('downloading') + '... (ﾟ▽ﾟ)/');
    try {
      await downloadFilesFromStructure(
        searchStore.selectedKey,
        aliasData,
        (msg) => statusStore.update(msg),
        t,
        i18nStore.formatFilesPackaged
      );
    } catch (e) {
      statusStore.update(t('downloadError') + ': ' + e.message + ' (；一_一)');
    }
    downloading = false;
  }

  async function handlePreview() {
    if (!searchStore.selectedKey) return;
    previewing = true;
    await sendPreview(
      searchStore.selectedKey,
      aliasData,
      modalStore.showChoice,
      t,
      (msg) => statusStore.update(msg)
    );
    previewing = false;
  }
</script>

<div class="flex justify-center gap-4 mt-4">
  <button
    disabled={disabled}
    onclick={handleDownload}
    class="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 border-0 rounded-xl w-28 sm:w-32 text-white text-base sm:text-lg disabled:transform-none transition-all hover:-translate-y-0.5 duration-100 cursor-pointer disabled:cursor-not-allowed"
  >
    {t('startDownload')}
  </button>
  <button
    disabled={disabled}
    onclick={handlePreview}
    class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 px-5 sm:px-6 py-2.5 sm:py-3 border-0 rounded-xl w-28 sm:w-32 text-white text-base sm:text-lg transition-all hover:-translate-y-0.5 duration-100 cursor-pointer disabled:cursor-not-allowed"
  >
    {t('previewBtn')}
  </button>
</div>
