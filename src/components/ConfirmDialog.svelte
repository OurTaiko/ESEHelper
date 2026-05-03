<script>
  import { modalStore } from '../lib/stores/modal.svelte.js';

  const typeConfigs = {
    info: {
      icon: 'fas fa-info-circle',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      buttonBg: 'bg-blue-500',
      buttonHover: 'hover:bg-blue-600'
    },
    success: {
      icon: 'fas fa-check-circle',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100 dark:bg-green-900',
      buttonBg: 'bg-green-500',
      buttonHover: 'hover:bg-green-600'
    },
    warning: {
      icon: 'fas fa-exclamation-triangle',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900',
      buttonBg: 'bg-yellow-500',
      buttonHover: 'hover:bg-yellow-600'
    },
    error: {
      icon: 'fas fa-times-circle',
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100 dark:bg-red-900',
      buttonBg: 'bg-red-500',
      buttonHover: 'hover:bg-red-600'
    }
  };

  let config = $derived(modalStore.confirmConfig);
  let typeConf = $derived(typeConfigs[config.type] || typeConfigs.info);

  function handleCancel() {
    modalStore.resolveConfirm(config.mode === 'choice' ? null : false);
  }

  function handleConfirm() {
    modalStore.resolveConfirm(true);
  }

  function handleChoice(value) {
    modalStore.resolveConfirm(value);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  }

  function handleEscape(e) {
    if (e.key === 'Escape') {
      handleCancel();
    }
  }
</script>

<svelte:window onkeydown={handleEscape} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm animate-fade-in"
  onclick={handleOverlayClick}
  role="dialog"
  aria-modal="true"
>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-11/12 max-w-md mx-4 transform transition-all duration-300 animate-scale-in">
    <div class="p-6">
      <div class="flex items-center mb-4">
        <div class="{typeConf.iconBg} rounded-full p-3 mr-4">
          <i class="{typeConf.icon} {typeConf.iconColor} text-xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {config.title}
        </h3>
      </div>

      {#if config.message}
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {config.message}
          </p>
        </div>
      {/if}

      {#if config.mode === 'choice'}
        <div class="flex flex-col gap-3">
          {#each config.choices as choice}
            <button
              class="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
              onclick={() => handleChoice(choice.value)}
            >
              <span class="mr-2">&#8226;</span>
              {choice.text}
            </button>
          {/each}
          <div class="flex justify-end mt-2">
            <button
              class="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
              onclick={handleCancel}
            >
              {config.cancelText || 'Cancel'}
            </button>
          </div>
        </div>
      {:else}
        <div class="flex gap-3 justify-end">
          <button
            class="cancel-btn px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 font-medium"
            onclick={handleCancel}
          >
            {config.cancelText}
          </button>
          <button
            class="confirm-btn px-4 py-2 text-white {typeConf.buttonBg} {typeConf.buttonHover} rounded-lg transition-colors duration-200 font-medium"
            onclick={handleConfirm}
          >
            {config.confirmText}
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
