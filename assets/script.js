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
});
