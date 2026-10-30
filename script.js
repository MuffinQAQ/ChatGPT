/* ============================================================
   AI 大模型导航 — 交互脚本（无依赖）
   ============================================================ */
(function () {
  'use strict';

  // 标记 JS 可用（用于启用滚动渐显动画；无 JS 时页面内容默认全部可见）
  document.documentElement.classList.add('js');

  // ---------- 返回顶部按钮 ----------
  var backTop = document.getElementById('backTop');
  var header = document.querySelector('.site-header');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (backTop) backTop.classList.toggle('show', y > 600);
    if (header) header.classList.toggle('scrolled', y > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- 卡片滚动渐显 ----------
  var revealEls = document.querySelectorAll('.reveal');

  function revealAll() {
    for (var i = 0; i < revealEls.length; i++) revealEls[i].classList.add('visible');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      var shown = 0;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (Math.min(shown, 6) * 60) + 'ms';
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
          shown++;
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    for (var j = 0; j < revealEls.length; j++) io.observe(revealEls[j]);
  } else {
    revealAll();
  }

})();
