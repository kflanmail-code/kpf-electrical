document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // review carousel arrows: slide one card width at a time
  document.querySelectorAll('.review-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.review-track');
    carousel.querySelectorAll('.carousel-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = track.querySelector('.review-card');
        var step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
        track.scrollBy({ left: step * Number(btn.getAttribute('data-dir')) });
      });
    });
  });

  // gallery: category filters (buttons with no matching photos are hidden) and a full-size viewer
  var grid = document.querySelector('.gallery-grid');
  if (grid) {
    var tiles = Array.prototype.slice.call(grid.querySelectorAll('li'));
    var filters = document.querySelectorAll('.filter-btn');

    filters.forEach(function (btn) {
      var cat = btn.getAttribute('data-filter');
      if (cat !== 'all' && !tiles.some(function (t) { return t.getAttribute('data-cat') === cat; })) {
        btn.hidden = true;
      }
      btn.addEventListener('click', function () {
        filters.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        tiles.forEach(function (t) {
          t.hidden = cat !== 'all' && t.getAttribute('data-cat') !== cat;
        });
      });
    });

    var box = document.querySelector('.lightbox');
    if (box && box.showModal) {
      var img = box.querySelector('img');
      var cap = box.querySelector('figcaption');
      var current = 0;
      var visible = function () { return tiles.filter(function (t) { return !t.hidden; }); };
      var show = function (i) {
        var list = visible();
        current = (i + list.length) % list.length;
        var link = list[current].querySelector('a');
        img.src = link.getAttribute('href');
        img.alt = link.querySelector('img').alt;
        cap.textContent = link.querySelector('.gallery-cap').textContent;
      };

      tiles.forEach(function (t) {
        t.querySelector('a').addEventListener('click', function (e) {
          e.preventDefault();
          show(visible().indexOf(t));
          box.showModal();
        });
      });
      box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
      box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
      box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
      box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
      box.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
      });
    }
  }
});
