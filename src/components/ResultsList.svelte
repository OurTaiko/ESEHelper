<script>
  import { searchStore } from '../lib/stores/search.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';
  import ResultItem from './ResultItem.svelte';

  const t = (key) => i18nStore.t(key);
</script>

{#if searchStore.results.length === 0 && searchStore.query}
  <ul
    class="bg-white shadow-lg mt-4 p-0 border border-gray-200 rounded-xl max-h-80 overflow-y-auto list-none"
  >
    <li class="px-4 py-3 text-gray-500">{t('noResults')} (´･ω･`)?</li>
  </ul>
{:else if searchStore.results.length > 0}
  <ul
    class="bg-white shadow-lg mt-4 p-0 border border-gray-200 rounded-xl max-h-80 overflow-y-auto list-none"
  >
    {#each searchStore.results as key (key)}
      <ResultItem name={key} />
    {/each}
  </ul>
{/if}
