
    // ── Countdown ─────────────────────────────────────────────────
    function updateCountdown() {
      const diff = CONFIG.fightDate - new Date();
      if (diff <= 0) return;
      const pad = n => String(Math.floor(n)).padStart(2, '0');
      document.getElementById('tc-days').textContent  = pad(diff / 86400000);
      document.getElementById('tc-hours').textContent = pad((diff % 86400000) / 3600000);
      document.getElementById('tc-mins').textContent  = pad((diff % 3600000) / 60000);
      document.getElementById('tc-secs').textContent  = pad((diff % 60000) / 1000);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ── FAQ accordion ─────────────────────────────────────────────
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item    = btn.closest('.faq-item');
        const isOpen  = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    function updateTierState() {
  const tiers = [
    {
      key:        'standard',
      btnSel:     '.tier-buy-btn.standard',
      cardSel:    '.tier-card.standard',
      fillSel:    '.availability-fill.standard',
      countSel:   '.tier-card.standard .tier-availability-label span:last-child',
    },
    {
      key:        'premium',
      btnSel:     '.tier-buy-btn.premium',
      cardSel:    '.tier-card.premium',
      fillSel:    '.availability-fill.premium',
      countSel:   '.tier-card.premium .tier-availability-label span:last-child',
    },
  ];

  tiers.forEach(({ key, btnSel, cardSel, fillSel, countSel }) => {
    const data    = CONFIG.tickets[key];
    const btn     = document.querySelector(btnSel);
    const fill    = document.querySelector(fillSel);
    const count   = document.querySelector(countSel);

    if (!btn) return;

    // ── Availability bar ──────────────────────────────────────
    if (fill && data.capacity) {
      const pct = ((data.capacity - data.remaining) / data.capacity) * 100;
      fill.style.width = Math.min(pct, 100) + '%';
    }

    // ── Remaining count ───────────────────────────────────────
    if (count) {
      count.textContent = data.soldOut
        ? 'Sold out'
        : `${data.remaining} remaining`;
    }

    // ── Sold out state ────────────────────────────────────────
    if (data.soldOut) {
      // Button
      btn.textContent = 'Sold out';
      btn.classList.add('sold-out');
      btn.removeAttribute('href');
      btn.setAttribute('aria-disabled', 'true');
      btn.style.pointerEvents = 'none';

      // Fill bar to 100%
      if (fill) fill.style.width = '100%';

      // Add sold out badge to card
      const card = document.querySelector(cardSel);
      if (card && !card.querySelector('.sold-out-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sold-out-overlay';
        overlay.textContent = 'Sold out';
        card.appendChild(overlay);
      }

    } else if (CONFIG.ticketsLive) {
      // Tickets live and available — set real URL
      btn.href = data.tailor_url;
      btn.target = '_blank';
      btn.rel = 'noopener';
    } else {
      // Not live yet — button does nothing
      btn.removeAttribute('href');
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.4';
    }
  });
}

updateTierState();


