function getCurrentTimeSession() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'day' : 'night';
}

function getAutoThemeByTime() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

function updateThemeChangeSession() {
  const now = Date.now();
  const session = getCurrentTimeSession();
  localStorage.setItem('lastThemeChangeTime', now.toString());
  localStorage.setItem('lastThemeChangeSession', session);
}

function shouldAutoSwitchTheme(lastChangeTime, lastChangeSession) {
  if (!lastChangeTime || !lastChangeSession) {
    return true;
  }

  const now = new Date();
  const currentSession = getCurrentTimeSession();

  if (currentSession !== lastChangeSession) {
    const lastChange = new Date(parseInt(lastChangeTime));
    const timeDiff = now - lastChange;

    if (timeDiff > 60 * 60 * 1000) {
      return true;
    }
  }

  return false;
}

function createThemeStore() {
  let theme = $state('light');
  let isAuto = $state(true);

  function applyTheme(t) {
    theme = t;
    document.documentElement.setAttribute('data-theme', t);
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const lastThemeChangeTime = localStorage.getItem('lastThemeChangeTime');
    const lastThemeChangeSession = localStorage.getItem('lastThemeChangeSession');

    if (savedTheme) {
      if (shouldAutoSwitchTheme(lastThemeChangeTime, lastThemeChangeSession)) {
        const autoTheme = getAutoThemeByTime();
        applyTheme(autoTheme);
        isAuto = true;
        updateThemeChangeSession();
      } else {
        applyTheme(savedTheme);
        isAuto = false;
      }
    } else {
      const autoTheme = getAutoThemeByTime();
      applyTheme(autoTheme);
      isAuto = true;
      updateThemeChangeSession();
    }
  }

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    isAuto = false;
    localStorage.setItem('theme', newTheme);
    updateThemeChangeSession();
  }

  function setAutoTheme() {
    localStorage.removeItem('theme');
    localStorage.removeItem('lastThemeChangeTime');
    localStorage.removeItem('lastThemeChangeSession');
    const autoTheme = getAutoThemeByTime();
    applyTheme(autoTheme);
    isAuto = true;
    updateThemeChangeSession();
  }

  return {
    get theme() { return theme; },
    get isAuto() { return isAuto; },
    get currentSession() { return getCurrentTimeSession(); },
    initTheme,
    toggleTheme,
    setAutoTheme
  };
}

export const themeStore = createThemeStore();
