import { filterKeys } from '../utils/search.js';

function createSearchStore() {
  let query = $state('');
  let results = $state([]);
  let selectedKey = $state(null);

  function performSearch(queryText, alias) {
    query = queryText;
    if (!queryText.trim()) {
      results = [];
      return;
    }
    results = filterKeys(queryText, alias);
  }

  function clearSelection() {
    selectedKey = null;
  }

  function setSelected(key) {
    selectedKey = key;
  }

  function reset() {
    query = '';
    results = [];
    selectedKey = null;
  }

  return {
    get query() { return query; },
    get results() { return results; },
    get selectedKey() { return selectedKey; },
    performSearch,
    clearSelection,
    setSelected,
    reset
  };
}

export const searchStore = createSearchStore();
