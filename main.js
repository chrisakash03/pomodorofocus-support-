// PomodoroFocus Support — minimal interactivity
(function () {
  const html = document.documentElement;
  const STORAGE_KEY = 'theme';

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    if (theme === 'dark') html.setAttribute('data-theme', 'dark');
    else html.setAttribute('data-theme', 'light');
  }

  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return systemPrefersDark() ? 'dark' : 'light';
  }

  function toggleTheme() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    updateToggleLabel(next);
  }

  function updateToggleLabel(theme) {
    const el = document.querySelector('[data-role="theme-toggle-label"]');
    const icon = document.querySelector('[data-role="theme-toggle-icon"]');
    if (!el || !icon) return;
    if (theme === 'dark') {
      el.textContent = 'Dark';
      icon.innerHTML = SUN_SVG;
    } else {
      el.textContent = 'Light';
      icon.innerHTML = MOON_SVG;
    }
  }

  const SUN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1Zm0 16a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1ZM4 13a1 1 0 0 0-1-1H2a1 1 0 1 0 0 2h1a1 1 0 0 0 1-1Zm18 0a1 1 0 0 0 1-1h-1a1 1 0 0 0-1 1 1 1 0 0 0 1 1ZM5.64 6.05a1 1 0 0 0 0-1.41L4.93 3.93a1 1 0 1 0-1.41 1.41l.71.71a1 1 0 0 0 1.41 0Zm12.02 12.02a1 1 0 0 0 0 1.41l.71.71a1 1 0 0 0 1.41-1.41l-.71-.71a1 1 0 0 0-1.41 0ZM18.36 6.05a1 1 0 0 0 1.41 0l.71-.71a1 1 0 1 0-1.41-1.41l-.71.71a1 1 0 0 0 0 1.41ZM6.05 18.36a1 1 0 0 0-1.41 0l-.71.71a1 1 0 1 0 1.41 1.41l.71-.71a1 1 0 0 0 0-1.41ZM12 6.5A5.5 5.5 0 1 0 17.5 12 5.5 5.5 0 0 0 12 6.5Z"/></svg>';
  const MOON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 1 0 21 12.79Z"/></svg>';

  // Initialize theme
  const initial = getTheme();
  applyTheme(initial);

  // Wire toggle
  document.addEventListener('click', function (e) {
    const tgt = e.target.closest('[data-action="toggle-theme"]');
    if (tgt) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Set dynamic year if present
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  updateToggleLabel(initial);

  // Optional logo: replace emoji if assets/logo.svg exists
  (function initBrandLogo() {
    const holder = document.querySelector('[data-role="brand-logo"]');
    if (!holder) return;
    const url = 'assets/logo.svg';
    const test = new Image();
    test.onload = () => {
      holder.textContent = '';
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'PomodoroFocus logo';
      img.width = 40;
      img.height = 40;
      img.style.width = '40px';
      img.style.height = '40px';
      img.style.borderRadius = '10px';
      img.style.display = 'block';
      holder.appendChild(img);
    };
    test.onerror = () => { /* keep emoji fallback */ };
    test.src = url;
  })();
})();
