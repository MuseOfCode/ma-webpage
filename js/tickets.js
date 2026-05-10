
   const TICKETS_LIVE = CONFIG.ticketsLive;
   const TICKET_URL   = CONFIG.ticketUrl; 
   const FIGHT_DATE = new Date(CONFIG.fightDate);

  
    function buildTicketBlocks() {
      const heroBlock  = document.getElementById('hero-ticket-block');
      const fightBlock = document.getElementById('fight-ticket-block');
      const navBtn     = document.getElementById('nav-ticket-btn');
      const fightStatus = document.getElementById('fight-ticket-status');
 
      if (TICKETS_LIVE) {
      
        navBtn.href        = 'tickets.html';
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

  