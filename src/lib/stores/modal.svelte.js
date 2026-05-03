function createModalStore() {
  let settingsOpen = $state(false);
  let discordOpen = $state(false);
  let confirmOpen = $state(false);
  let confirmConfig = $state({
    title: '',
    message: '',
    type: 'info',
    mode: 'confirm',
    confirmText: '',
    cancelText: '',
    choices: []
  });
  let confirmResolve = $state(null);

  function openSettings() {
    settingsOpen = true;
  }

  function closeSettings() {
    settingsOpen = false;
  }

  function openDiscord() {
    discordOpen = true;
  }

  function closeDiscord() {
    discordOpen = false;
  }

  function closeAllModals() {
    settingsOpen = false;
    discordOpen = false;
  }

  function showConfirm(options) {
    return new Promise((resolve) => {
      confirmResolve = resolve;
      confirmConfig = {
        title: options.title || '',
        message: typeof options === 'string' ? options : options.message,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        type: options.type || 'info',
        mode: 'confirm',
        choices: []
      };
      confirmOpen = true;
    });
  }

  function showChoice(options) {
    return new Promise((resolve) => {
      confirmResolve = resolve;
      confirmConfig = {
        title: options.title || '',
        message: options.message || '',
        confirmText: '',
        cancelText: '',
        type: options.type || 'info',
        mode: 'choice',
        choices: options.choices || []
      };
      confirmOpen = true;
    });
  }

  function resolveConfirm(value) {
    if (confirmResolve) {
      confirmResolve(value);
    }
    confirmOpen = false;
    confirmResolve = null;
  }

  return {
    get settingsOpen() { return settingsOpen; },
    get discordOpen() { return discordOpen; },
    get confirmOpen() { return confirmOpen; },
    get confirmConfig() { return confirmConfig; },
    openSettings,
    closeSettings,
    openDiscord,
    closeDiscord,
    closeAllModals,
    showConfirm,
    showChoice,
    resolveConfirm
  };
}

export const modalStore = createModalStore();
