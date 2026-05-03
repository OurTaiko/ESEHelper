<script>
  import { searchStore } from '../lib/stores/search.svelte.js';

  let { name } = $props();

  let isSelected = $derived(searchStore.selectedKey === name);

  function handleClick() {
    searchStore.setSelected(name);
  }
</script>

<li
  class="result-item px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors duration-100 hover:bg-red-50"
  class:selected={isSelected}
  class:bg-red-100={isSelected}
  class:text-red-500={isSelected}
  class:font-bold={isSelected}
  class:border-l-4={isSelected}
  class:border-red-500={isSelected}
  onclick={handleClick}
>
  {name}
</li>
