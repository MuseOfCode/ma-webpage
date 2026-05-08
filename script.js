 const SOCIAL_URLS = {
  instagram: 'https://www.instagram.com/mitchellasare/',
  tiktok:    'https://www.tiktok.com/@mitchasare',
  youtube:   'N/A',
};
 
 const TICKETS_LIVE = false;
    const TICKET_URL   = 'LINK'; // only used when TICKETS_LIVE = true
 const FIGHT_DATE = new Date('2026-06-27T18:00:00');

    // ═══════════════════════════════════════════════════════════════
 
 
    // ── Build ticket blocks ───────────────────────────────────────
    function buildTicketBlocks() {
      const heroBlock  = document.getElementById('hero-ticket-block');
      const fightBlock = document.getElementById('fight-ticket-block');
      const navBtn     = document.getElementById('nav-ticket-btn');
      const fightStatus = document.getElementById('fight-ticket-status');
 
      if (TICKETS_LIVE) {
        // ── LIVE: show real ticket button everywhere ──────────────
        navBtn.href        = TICKET_URL;
        navBtn.target      = '_blank';
        navBtn.textContent = 'Get tickets';
 
        if (fightStatus) fightStatus.textContent = 'Available now — limited capacity';
 
        heroBlock.innerHTML = `
          <a href="${TICKET_URL}" class="btn-primary" target="_blank" rel="noopener">
            Get tickets
          </a>`;
 
        fightBlock.innerHTML = `
          <a href="${TICKET_URL}" class="btn-primary" target="_blank" rel="noopener">
            Get tickets
          </a>`;
 
      } else {
        // ── NOT LIVE: show email capture everywhere ───────────────
        navBtn.href        = '#fight';
        navBtn.textContent = 'Notify me';
 
        if (fightStatus) fightStatus.textContent = 'Dropping soon · limited capacity';
 
        heroBlock.innerHTML = captureHTML('hero-form', true);
        fightBlock.innerHTML = captureHTML('fight-form', false);
 
        // Wire up both forms
        ['hero-form', 'fight-form'].forEach(id => {
          document.getElementById(id).addEventListener('submit', handleCapture);
        });
      }
    }
 
    function captureHTML(formId, isHero) {
      return `
        <div class="ticket-capture ${isHero ? 'hero-variant' : ''}">
          <span class="ticket-soon-label">Tickets dropping soon</span>
          <form class="ticket-capture-form" id="${formId}">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Notify me</button>
          </form>
          <span class="ticket-urgency">Limited capacity · be first to know when tickets go live</span>
        </div>`;
    }
 
    function handleCapture(e) {
      e.preventDefault();
      const form = e.currentTarget;
      const btn  = form.querySelector('button');
      const input = form.querySelector('input');
 
      // Visual confirmation
      form.classList.add('submitted');
      btn.textContent = "You're on the list ✓";
      input.value = '';
      input.disabled = true;
 
      // Here you'd normally POST to your email service e.g. Mailchimp, Buttondown, Formspree
      // Example with Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })
      // For now it just confirms visually
    }
 
    buildTicketBlocks();
 
 
    // ── Countdown logic ───────────────────────────────────────────
    function updateCountdown() {
      const now  = new Date();
      const diff = FIGHT_DATE - now;
 
      if (diff <= 0) {
        ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
          document.getElementById(id).textContent = '00';
        });
        ['fcd-days','fcd-hours','fcd-mins','fcd-secs'].forEach(id => {
          document.getElementById(id).textContent = '00';
        });
        return;
      }
 
      const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs  = Math.floor((diff % (1000 * 60)) / 1000);
 
      const pad = n => String(n).padStart(2, '0');
 
      document.getElementById('cd-days').textContent   = pad(days);
      document.getElementById('cd-hours').textContent  = pad(hours);
      document.getElementById('cd-mins').textContent   = pad(mins);
      document.getElementById('cd-secs').textContent   = pad(secs);
 
      document.getElementById('fcd-days').textContent  = pad(days);
      document.getElementById('fcd-hours').textContent = pad(hours);
      document.getElementById('fcd-mins').textContent  = pad(mins);
      document.getElementById('fcd-secs').textContent  = pad(secs);
    }
 
    updateCountdown();
    setInterval(updateCountdown, 1000);
 
 
    // ── Nav scroll state ──────────────────────────────────────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
 
 
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

       // ── Contact form (section 07) ─────────────────────────────────
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
 
      const btn     = document.getElementById('contact-submit');
      const success = document.getElementById('contact-success');
      const form    = e.target;
 
      // Basic validation
      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();
      const enquiry = form.enquiry.value;
 
      if (!name || !email || !message || !enquiry) return;
 
      // Loading state
      btn.textContent = 'Sending…';
      btn.disabled = true;
 
      // ── Connect to Formspree when ready ──────────────────────────
      // 1. Go to formspree.io, create a free form, copy your endpoint
      // 2. Replace the fetch URL below with: 'https://formspree.io/f/YOUR_ID'
      // 3. That's it — submissions go straight to your email inbox
      //
      // fetch('https://formspree.io/f/YOUR_ID', {
      //   method: 'POST',
      //   headers: { 'Accept': 'application/json' },
      //   body: new FormData(form)
      // })
      // .then(r => r.ok ? showSuccess() : showError())
      // .catch(() => showError());
      //
      // For now, simulates success visually:
      setTimeout(() => showSuccess(), 800);
 
      function showSuccess() {
        btn.textContent = 'Sent ✓';
        success.classList.add('visible');
        // Clear fields
        form.querySelectorAll('input, textarea').forEach(el => el.value = '');
        form.querySelector('select').value = '';
      }
    });

    
    const video = document.querySelector(".scroll-video");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            video.play();
        } else {
            video.pause();
        }

    });
}, {
    threshold: 0.4
});

observer.observe(video);


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
        if (TICKETS_LIVE) {
          menuBtn.href        = TICKET_URL;
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
 
        // ═══════════════════════════════════════════════════════════════
 
    // ── Wire all social links from single config ──────────────────
    document.querySelectorAll('[aria-label="Instagram"]').forEach(el => el.href = SOCIAL_URLS.instagram);
    document.querySelectorAll('[aria-label="TikTok"]').forEach(el => el.href = SOCIAL_URLS.tiktok);
    document.querySelectorAll('[aria-label="YouTube"]').forEach(el => el.href = SOCIAL_URLS.youtube);