/* =========================================================
   Paperhearth Studios — interactions
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }

  /* ---------- scroll reveals ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- cursor-follow warm glow (desktop, fine pointer) ---------- */
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : null;
    };
    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      glow.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(loop);
    });
    window.addEventListener('mouseout', (e) => { if (!e.relatedTarget) glow.style.opacity = '0'; });
  }

  /* ---------- services slider ---------- */
  const slider = document.querySelector('.slider');
  if (slider) {
    const track = slider.querySelector('.slider-track');
    const cards = Array.from(track.querySelectorAll('.svc-card'));
    const prev = slider.querySelector('[data-dir="prev"]');
    const next = slider.querySelector('[data-dir="next"]');
    const dotsWrap = slider.querySelector('.slider-dots');
    let active = 0;

    // build dots
    cards.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to service ' + (i + 1));
      b.addEventListener('click', () => scrollToCard(i));
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    const centerOf = (el) => el.offsetLeft + el.offsetWidth / 2;

    function render() {
      cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
      dots.forEach((d, i) => d.classList.toggle('on', i === active));
      if (prev) prev.disabled = active === 0;
      if (next) next.disabled = active === cards.length - 1;
    }

    function scrollToCard(i) {
      i = Math.max(0, Math.min(cards.length - 1, i));
      active = i;
      const target = centerOf(cards[i]) - track.clientWidth / 2;
      track.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
      render();
    }

    // sync active card to nearest-center on manual scroll
    let scrollRaf = null;
    track.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0, bestDist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(centerOf(c) - mid);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        if (best !== active) { active = best; render(); }
        scrollRaf = null;
      });
    }, { passive: true });

    if (prev) prev.addEventListener('click', () => scrollToCard(active - 1));
    if (next) next.addEventListener('click', () => scrollToCard(active + 1));

    cards.forEach((c, i) => c.addEventListener('click', () => { if (i !== active) scrollToCard(i); }));

    // keyboard
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollToCard(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToCard(active - 1); }
    });

    // start centered on first card
    window.addEventListener('load', () => scrollToCard(0));
    setTimeout(() => scrollToCard(0), 60);
    window.addEventListener('resize', () => scrollToCard(active));
  }

  /* ---------- work filters ---------- */
  const chips = document.querySelectorAll('.chip');
  if (chips.length) {
    const items = document.querySelectorAll('.work-item');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.dataset.filter;
        items.forEach((it) => {
          const show = f === 'all' || it.dataset.niche === f;
          it.classList.toggle('hide', !show);
        });
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      faqItems.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- contact form (placeholder submit) ---------- */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });
  }
})();
