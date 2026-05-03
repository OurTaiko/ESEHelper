<script>
  import { i18nStore } from '../lib/stores/i18n.svelte.js';
  const t = (key) => i18nStore.t(key);
</script>

<footer class="bg-gray-100 mt-auto p-5 border-gray-300 border-t text-gray-500 text-sm text-center">
  &copy; 2025 <a href="https://github.com/KirisameVanilla" target="_blank" rel="noopener"
    class="text-red-500 hover:underline no-underline">KirisameVanilla</a><br />
  <span>{t('footerText')}</span>
</footer>
