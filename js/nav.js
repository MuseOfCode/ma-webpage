
   
           // ── Wire all social links from single config ──────────────────
    document.querySelectorAll('[aria-label="Instagram"]').forEach(el => el.href = CONFIG.social.instagram);
    document.querySelectorAll('[aria-label="TikTok"]').forEach(el => el.href = CONFIG.social.tiktok);
    document.querySelectorAll('[aria-label="YouTube"]').forEach(el => el.href = CONFIG.social.youtube);


   
   // ── Social email form (section 06) ────────────────────────────
    function handleEmail(e) {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.textContent = 'Done ✓';
      btn.style.background   = '#1D9E75';
      btn.style.borderColor  = '#1D9E75';
      btn.style.color        = '#fff';
      e.target.querySelector('input').value = '';
    }
    
  // ── Nav scroll state ──────────────────────────────────────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

     // ── CS Burger menu ────────────────────────────────────────────
    (() => {
      const MOBILE_BP = 768;
      const isMobile  = () => window.matchMedia(`(max-width: ${MOBILE_BP}px)`).matches;
 
      const toggle     = document.getElementById('cs-toggle');
      const wrapper    = document.getElementById('cs-ul-wrapper');
      const navEl      = document.getElementById('nav');
 
      if (!toggle || !wrapper || !navEl) return;
 
      // Start with wrapper inert on mobile
      wrapper.inert = isMobile();
 
      function openMenu() {
        toggle.classList.add('cs-active');
        navEl.classList.add('cs-active');
        document.body.classList.add('cs-open');
        toggle.setAttribute('aria-expanded', 'true');
        if (isMobile()) wrapper.inert = false;
      }
 
      function closeMenu() {
        toggle.classList.remove('cs-active');
        navEl.classList.remove('cs-active');
        document.body.classList.remove('cs-open');
        toggle.setAttribute('aria-expanded', 'false');
        if (isMobile()) wrapper.inert = true;
      }
 
      function isOpen() { return navEl.classList.contains('cs-active'); }
 
      toggle.addEventListener('click', () => isOpen() ? closeMenu() : openMenu());
 
      // Close when clicking the backdrop (nav element itself, outside panel)
      navEl.addEventListener('click', (e) => {
        if (e.target === navEl && isOpen()) closeMenu();
      });
 
      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) { closeMenu(); toggle.focus(); }
      });
 
      // Close on scroll
      window.addEventListener('scroll', () => { if (isOpen()) closeMenu(); });
 
      // Close nav links click on mobile
      wrapper.querySelectorAll('.cs-li-link, .cs-menu-notify').forEach(link => {
        link.addEventListener('click', () => { if (isMobile()) closeMenu(); });
      });
 
      // Sync menu notify button with ticket system
      function syncMenuNotify() {
        const menuBtn = document.getElementById('menu-notify-btn');
        if (!menuBtn) return;
        if (CONFIG.ticketsLive) {
          menuBtn.href        = CONFIG.ticketUrl;
          menuBtn.target      = '_blank';
          menuBtn.textContent = 'Get tickets';
        } else {
          menuBtn.href        = '#fight';
          menuBtn.textContent = 'Notify me';
        }
      }
      syncMenuNotify();
 
      // Resize: reset inert + close if resized to desktop while open
      window.addEventListener('resize', () => {
        wrapper.inert = isMobile();
        if (!isMobile() && isOpen()) closeMenu();
      });
    })();

     

 

