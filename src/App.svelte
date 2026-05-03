<script>
  import { i18nStore } from '$lib/stores/i18n.svelte.js';
  import { modalStore } from '$lib/stores/modal.svelte.js';
  import { themeStore } from '$lib/stores/theme.svelte.js';
  import Header from './components/Header.svelte';
  import MainContent from './components/MainContent.svelte';
  import Footer from './components/Footer.svelte';
  import FloatingButtons from './components/FloatingButtons.svelte';
  import SettingsModal from './components/SettingsModal.svelte';
  import DiscordModal from './components/DiscordModal.svelte';
  import ConfirmDialog from './components/ConfirmDialog.svelte';

  themeStore.initTheme();

  function handleEscape(e) {
    if (e.key === 'Escape') {
      modalStore.closeAllModals();
    }
  }
</script>

<svelte:window onkeydown={handleEscape} />

<div class="flex flex-col bg-gray-50 min-h-screen font-sans text-gray-800 leading-relaxed">
  <Header />
  <MainContent />
  <Footer />
  <FloatingButtons />

  {#if modalStore.settingsOpen}
    <SettingsModal />
  {/if}

  {#if modalStore.discordOpen}
    <DiscordModal />
  {/if}

  {#if modalStore.confirmOpen}
    <ConfirmDialog />
  {/if}
</div>
