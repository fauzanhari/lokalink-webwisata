/* Utility Functions for LokaLink */

function money(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function formatIDR(n) {
  return money(n);
}

function escapeHtml(v) {
  return String(v ?? '').replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

function escapeAttr(v) {
  return escapeHtml(v).replace(/`/g, '&#96;');
}

function tr(k) {
  return (translations[uiLanguage] || translations.en)[k] || k;
}

let toastTimer;
function showToast(message) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
