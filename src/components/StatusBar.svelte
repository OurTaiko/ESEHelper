<script>
  import { statusStore } from '../lib/stores/status.svelte.js';
</script>

<div class="bg-gray-100 mt-6 p-4 rounded-xl text-gray-600 text-sm break-words whitespace-pre-wrap status">
  {statusStore.message}
</div>
