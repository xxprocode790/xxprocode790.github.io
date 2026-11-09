(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // Navigation: accessible mobile menu, no plugins or dependencies.
  const toggle = $('.nav-toggle');
  const nav = $('.site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      toggle.innerHTML = open
        ? '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5 19 19M19 5 5 19"/></svg>'
        : '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    $$('.site-nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760 && document.body.classList.contains('menu-open')) setOpen(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setOpen(false); toggle.focus(); }
    });
  }

  // Gentle reveal. Static content remains fully visible if JS is unavailable.
  const reveal = $$('.reveal');
  if (reveal.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px 45px 0px' });
    reveal.forEach(el => observer.observe(el));
  }

  // Portfolio filters.
  const cards = $$('.project-card');
  const filters = $$('.filter-btn');
  if (filters.length && cards.length) {
    filters.forEach(btn => btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filters.forEach(item => {
        const selected = item === btn;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      let visible = 0;
      cards.forEach(card => {
        const show = category === 'todos' || card.dataset.category === category;
        card.hidden = !show;
        if (show) visible++;
      });
      const count = $('[data-gallery-count]');
      if (count) count.textContent = String(visible);
    }));
  }

  // Portfolio lightbox with keyboard controls and focus restoration.
  const lightbox = $('#gallery-lightbox');
  if (lightbox && cards.length) {
    const photo = $('.lightbox-photo', lightbox);
    const name = $('#lightbox-title', lightbox);
    const place = $('#lightbox-place', lightbox);
    const counter = $('#lightbox-counter', lightbox);
    const close = $('.lightbox-close', lightbox);
    const getVisible = () => cards.filter(card => !card.hidden);
    let activeIndex = 0;
    let previousFocus = null;
    const render = () => {
      const visible = getVisible();
      if (!visible.length) return;
      activeIndex = (activeIndex + visible.length) % visible.length;
      const card = visible[activeIndex];
      photo.src = card.dataset.image;
      photo.alt = `Fotografia histórica: ${card.dataset.title} (${card.dataset.location})`;
      name.textContent = card.dataset.title;
      place.textContent = `${card.dataset.location} · ${card.dataset.categoryLabel}`;
      counter.textContent = `${activeIndex + 1} / ${visible.length}`;
    };
    const show = card => {
      previousFocus = document.activeElement;
      activeIndex = getVisible().indexOf(card);
      render();
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
      close.focus();
    };
    const hide = () => {
      lightbox.hidden = true;
      photo.src = '';
      document.body.classList.remove('lightbox-open');
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    };
    cards.forEach(card => card.addEventListener('click', () => show(card)));
    $$('[data-close-lightbox]', lightbox).forEach(btn => btn.addEventListener('click', hide));
    $('[data-lightbox-prev]', lightbox).addEventListener('click', () => { activeIndex--; render(); });
    $('[data-lightbox-next]', lightbox).addEventListener('click', () => { activeIndex++; render(); });
    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); hide(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); activeIndex++; render(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); activeIndex--; render(); }
      else if (e.key === 'Tab') { // Keep the dialog focus inside its visible controls.
        const tabbables = $$('button:not([disabled])', lightbox);
        if (!tabbables.length) return;
        const first = tabbables[0], last = tabbables[tabbables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // The form intentionally does not transmit or store data on a server.
  // It opens a prefilled email in the visitor's own email client.
  const form = $('#orcamento-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const value = key => String(data.get(key) || '').trim();
      const subject = `Solicitação de orçamento INSTEC — ${value('assunto')}`;
      const body = [
        'Olá, equipe INSTEC!',
        '',
        'Gostaria de solicitar uma avaliação/orçamento com os seguintes dados:',
        '',
        `Nome: ${value('nome')}`,
        `Empresa: ${value('empresa') || 'Não informado'}`,
        `E-mail: ${value('email')}`,
        `Telefone: ${value('telefone') || 'Não informado'}`,
        `Tipo de serviço: ${value('assunto')}`,
        '',
        'Descrição:',
        value('mensagem'),
        '',
        'Mensagem preparada pelo site instec.eng.br.'
      ].join('\n');
      const mailto = `mailto:orcamentos@instec.eng.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const feedback = $('.form-feedback', form);
      feedback.hidden = false;
      feedback.textContent = 'Seu aplicativo de e-mail deverá abrir com a mensagem. Confira os dados e clique em Enviar no aplicativo para concluir.';
      window.location.href = mailto;
    });
  }

  $$('[data-current-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
})();
