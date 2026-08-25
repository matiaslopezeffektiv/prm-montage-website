/* ============================================
   PRM MONTAGE — Enkel lightbox för projektgalleriet
   Öppnas via .nt-gallery-item, navigerar bland alla
   just nu synliga (ej [hidden]) bilder i samma grid.
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('nt-lightbox');
  if (!overlay) return;

  var imgEl = overlay.querySelector('img');
  var captionEl = overlay.querySelector('.nt-lightbox-caption');
  var closeBtn = overlay.querySelector('.nt-lightbox-close');
  var prevBtn = overlay.querySelector('.nt-lightbox-prev');
  var nextBtn = overlay.querySelector('.nt-lightbox-next');

  var items = [];
  var currentIndex = 0;

  function visibleItems() {
    return Array.prototype.filter.call(
      document.querySelectorAll('.nt-gallery-item'),
      function (el) { return !el.hasAttribute('hidden'); }
    );
  }

  function openAt(index) {
    items = visibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    var item = items[currentIndex];
    var img = item.querySelector('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt || '';
    captionEl.textContent = img.alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.nt-gallery-item').forEach(function (item, i) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      openAt(visibleItems().indexOf(item));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', function () { openAt(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { openAt(currentIndex + 1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') openAt(currentIndex - 1);
    if (e.key === 'ArrowRight') openAt(currentIndex + 1);
  });
});
