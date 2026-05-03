<script>
  import { searchStore } from '../lib/stores/search.svelte.js';
  import { statusStore } from '../lib/stores/status.svelte.js';
  import { i18nStore } from '../lib/stores/i18n.svelte.js';

  let { aliasData } = $props();

  let inputValue = $state('');
  let searchTimeout = null;

  const t = (key) => i18nStore.t(key);

  function handleInput(e) {
    inputValue = e.target.value;
    searchStore.clearSelection();

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      if (aliasData) {
        searchStore.performSearch(inputValue, aliasData);
        statusStore.reset(t('greeting'));
      }
    }, 300);
  }
</script>

<input
  id="search"
  placeholder={t('searchPlaceholder')}
  autocomplete="off"
  value={inputValue}
  oninput={handleInput}
  class="box-border focus:shadow-lg focus:shadow-red-100 p-2.5 sm:p-3 border-2 border-gray-300 focus:border-red-500 rounded-xl outline-none w-full text-base sm:text-lg transition-colors duration-100"
/>
