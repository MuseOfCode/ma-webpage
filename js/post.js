
    // ── Share buttons ─────────────────────────────────────────────
    function sharePost(platform) {
      const url  = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(document.title);
      const urls = {
        twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      };
      if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=400');
    }

    function copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.querySelector('[aria-label="Copy link"]');
        btn.style.borderColor = '#1D9E75';
        btn.style.color = '#1D9E75';
        setTimeout(() => { btn.style.borderColor = ''; btn.style.color = ''; }, 2000);
      });
    }

    // ── CS Burger menu ────────────────────────────────────────────
    (() => {
      const MOBILE_BP = 768;
      const isMobile  = () => window.matchMedia(`(max-width: ${MOBILE_BP}px)`).matches;
      const toggle  = document.getElementById('cs-toggle');
      const wrapper = document.getElementById('cs-ul-wrapper');
      const navEl   = document.getElementById('nav');
      if (!toggle || !wrapper || !navEl) return;
      wrapper.inert = isMobile();
      const isOpen  = () => navEl.classList.contains('cs-active');
      function openMenu()  { toggle.classList.add('cs-active'); navEl.classList.add('cs-active'); document.body.classList.add('cs-open'); toggle.setAttribute('aria-expanded','true'); if (isMobile()) wrapper.inert = false; }
      function closeMenu() { toggle.classList.remove('cs-active'); navEl.classList.remove('cs-active'); document.body.classList.remove('cs-open'); toggle.setAttribute('aria-expanded','false'); if (isMobile()) wrapper.inert = true; }
      toggle.addEventListener('click', () => isOpen() ? closeMenu() : openMenu());
      navEl.addEventListener('click', (e) => { if (e.target === navEl && isOpen()) closeMenu(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) { closeMenu(); toggle.focus(); } });
      wrapper.querySelectorAll('.cs-li-link, .cs-menu-notify').forEach(l => l.addEventListener('click', () => { if (isMobile()) closeMenu(); }));
      window.addEventListener('resize', () => { wrapper.inert = isMobile(); if (!isMobile() && isOpen()) closeMenu(); });
    })();
