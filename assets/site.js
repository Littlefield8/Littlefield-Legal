// Theme persistence — classic | editorial | alpine
(function () {
  const STORAGE_KEY = 'lf-theme';
  const VALID = ['classic', 'editorial', 'alpine'];

  function applyTheme(theme) {
    if (!VALID.includes(theme)) theme = 'classic';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  const stored = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } })();
  applyTheme(stored || 'classic');
  window.__lfApplyTheme = applyTheme;
  window.__lfGetTheme = () => document.documentElement.getAttribute('data-theme') || 'classic';
})();
