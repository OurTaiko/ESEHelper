<script>
  import { loadAlias } from '../lib/utils/api.js';
  import { statusStore } from '../lib/stores/status.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';
  import { searchStore } from '../lib/stores/search.svelte.js';
  import SearchInput from './SearchInput.svelte';
  import ActionButtons from './ActionButtons.svelte';
  import StatusBar from './StatusBar.svelte';
  import ResultsList from './ResultsList.svelte';

  const t = (key) => i18nStore.t(key);

  let aliasData = $state(null);
  let loaded = $state(false);
  let error = $state('');

  // Load alias data on mount
  (async () => {
    statusStore.update(t('loadingDataFiles'));
    try {
      aliasData = await loadAlias();
      loaded = true;
      statusStore.reset(t('loadingCompleted'));
    } catch (e) {
      error = t('loadDataFilesFailed') + ' ' + e.message + ' (；へ：)';
      statusStore.update(error);
    }
  })();
</script>

<main class="box-border flex-1 mx-auto my-4 p-4 sm:p-6 w-full max-w-3xl">
  {#if loaded}
    <SearchInput aliasData={aliasData} />
    <ActionButtons {aliasData} />
  {:else if error}
    <p class="text-center text-red-500">{error}</p>
  {:else}
    <p class="text-center text-gray-500">{statusStore.message}</p>
  {/if}

  <StatusBar />
  <ResultsList />
</main>
