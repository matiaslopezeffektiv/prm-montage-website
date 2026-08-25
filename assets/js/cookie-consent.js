(function () {
  var STORAGE_KEY = 'nt_cookie_consent';

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(c) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('nt-consent-updated', { detail: c }));
    maybeLoadAnalytics(c);
  }

  function maybeLoadAnalytics(c) {
    if (c && c.statistics && !document.getElementById('nt-vercel-analytics')) {
      var s = document.createElement('script');
      s.id = 'nt-vercel-analytics';
      s.defer = true;
      s.src = '/_vercel/insights/script.js';
      document.head.appendChild(s);
    }
  }

  function injectStyles() {
    if (document.getElementById('nt-cookie-styles')) return;
    var style = document.createElement('style');
    style.id = 'nt-cookie-styles';
    style.textContent =
      '#nt-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#1F5C50;color:#fff;padding:22px 24px;box-shadow:0 -6px 24px rgba(0,0,0,.18);transform:translateY(110%);transition:transform .4s ease;}' +
      '#nt-cookie-banner.nt-show{transform:translateY(0);}' +
      '#nt-cookie-banner .nt-cookie-inner{max-width:1140px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:18px;justify-content:space-between;}' +
      '#nt-cookie-banner p{margin:0;font-size:.92rem;line-height:1.6;color:rgba(255,255,255,.85);max-width:640px;}' +
      '#nt-cookie-banner a{color:#1FA968;}' +
      '#nt-cookie-banner .nt-cookie-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;}' +
      '#nt-cookie-banner button{border:none;cursor:pointer;font-size:.88rem;font-weight:600;padding:11px 20px;border-radius:8px;transition:.2s;white-space:nowrap;font-family:inherit;}' +
      '#nt-cookie-banner .nt-btn-accept{background:#1FA968;color:#fff;}' +
      '#nt-cookie-banner .nt-btn-accept:hover{background:#178552;}' +
      '#nt-cookie-banner .nt-btn-reject{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.35);}' +
      '#nt-cookie-banner .nt-btn-reject:hover{border-color:#fff;}' +
      '#nt-cookie-banner .nt-btn-settings{background:transparent;color:rgba(255,255,255,.75);text-decoration:underline;padding:11px 4px;}' +
      '#nt-cookie-panel{display:none;max-width:1140px;margin:16px auto 0;border-top:1px solid rgba(255,255,255,.15);padding-top:18px;}' +
      '#nt-cookie-panel.nt-show{display:block;}' +
      '#nt-cookie-panel .nt-cookie-row{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);}' +
      '#nt-cookie-panel .nt-cookie-row:last-child{border-bottom:none;}' +
      '#nt-cookie-panel h5{margin:0 0 4px;font-size:.95rem;color:#fff;}' +
      '#nt-cookie-panel p{max-width:none;font-size:.85rem;}' +
      '#nt-cookie-panel .nt-switch{position:relative;width:44px;height:24px;flex-shrink:0;display:inline-block;}' +
      '#nt-cookie-panel .nt-switch input{opacity:0;width:0;height:0;position:absolute;}' +
      '#nt-cookie-panel .nt-switch .nt-slider{position:absolute;inset:0;background:rgba(255,255,255,.25);border-radius:999px;cursor:pointer;transition:.2s;}' +
      '#nt-cookie-panel .nt-switch .nt-slider:before{content:"";position:absolute;width:18px;height:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s;}' +
      '#nt-cookie-panel .nt-switch input:checked+.nt-slider{background:#1FA968;}' +
      '#nt-cookie-panel .nt-switch input:checked+.nt-slider:before{transform:translateX(20px);}' +
      '#nt-cookie-panel .nt-switch input:disabled+.nt-slider{opacity:.5;cursor:not-allowed;}' +
      '#nt-cookie-panel .nt-cookie-save{margin-top:16px;}' +
      '@media (max-width:768px){#nt-cookie-banner .nt-cookie-inner{flex-direction:column;align-items:stretch;}#nt-cookie-banner .nt-cookie-actions{justify-content:stretch;}#nt-cookie-banner button{flex:1;}}';
    document.head.appendChild(style);
  }

  function buildBanner() {
    var wrap = document.createElement('div');
    wrap.id = 'nt-cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', 'Cookie-inställningar');
    wrap.innerHTML =
      '<div class="nt-cookie-inner">' +
        '<p>Vi använder cookies för att webbplatsen ska fungera och, om du godkänner, för statistik. Läs mer i vår <a href="/integritetspolicy">integritetspolicy</a>.</p>' +
        '<div class="nt-cookie-actions">' +
          '<button type="button" class="nt-btn-settings" data-nt-action="settings">Anpassa</button>' +
          '<button type="button" class="nt-btn-reject" data-nt-action="reject">Endast nödvändiga</button>' +
          '<button type="button" class="nt-btn-accept" data-nt-action="accept">Acceptera alla</button>' +
        '</div>' +
      '</div>' +
      '<div id="nt-cookie-panel">' +
        '<div class="nt-cookie-row">' +
          '<div><h5>Nödvändiga</h5><p>Krävs för att webbplatsen ska fungera. Kan inte stängas av.</p></div>' +
          '<label class="nt-switch"><input type="checkbox" checked disabled><span class="nt-slider"></span></label>' +
        '</div>' +
        '<div class="nt-cookie-row">' +
          '<div><h5>Statistik</h5><p>Anonymiserad besöksstatistik (Vercel Analytics) som hjälper oss förstå hur webbplatsen används.</p></div>' +
          '<label class="nt-switch"><input type="checkbox" id="nt-consent-stats"><span class="nt-slider"></span></label>' +
        '</div>' +
        '<div class="nt-cookie-save"><button type="button" class="nt-btn-accept" data-nt-action="save">Spara val</button></div>' +
      '</div>';
    document.body.appendChild(wrap);

    wrap.addEventListener('click', function (e) {
      var action = e.target.getAttribute('data-nt-action');
      if (!action) return;
      if (action === 'accept') {
        saveConsent({ necessary: true, statistics: true, ts: Date.now() });
        hideBanner();
      } else if (action === 'reject') {
        saveConsent({ necessary: true, statistics: false, ts: Date.now() });
        hideBanner();
      } else if (action === 'settings') {
        document.getElementById('nt-cookie-panel').classList.toggle('nt-show');
      } else if (action === 'save') {
        saveConsent({
          necessary: true,
          statistics: document.getElementById('nt-consent-stats').checked,
          ts: Date.now(),
        });
        hideBanner();
      }
    });

    return wrap;
  }

  function showBanner() {
    injectStyles();
    var el = document.getElementById('nt-cookie-banner') || buildBanner();
    requestAnimationFrame(function () {
      el.classList.add('nt-show');
    });
  }

  function hideBanner() {
    var el = document.getElementById('nt-cookie-banner');
    if (el) el.classList.remove('nt-show');
  }

  window.ntOpenCookieSettings = function () {
    showBanner();
    var panel = document.getElementById('nt-cookie-panel');
    if (panel) {
      panel.classList.add('nt-show');
      var c = readConsent();
      var stats = document.getElementById('nt-consent-stats');
      if (stats) stats.checked = !!(c && c.statistics);
    }
  };

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.nt-cookie-settings-link')) {
      e.preventDefault();
      window.ntOpenCookieSettings();
    }
  });

  var existingConsent = readConsent();
  if (existingConsent) {
    maybeLoadAnalytics(existingConsent);
  } else {
    showBanner();
  }
})();
