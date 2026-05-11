// tickets.js — replace the top variables with:
function buildTicketBlocks() {
  const heroBlock   = document.getElementById('hero-ticket-block');
  const fightBlock  = document.getElementById('fight-ticket-block');
  const navBtn      = document.getElementById('nav-ticket-btn');
  const menuBtn     = document.getElementById('menu-notify-btn');
  const fightStatus = document.getElementById('fight-ticket-status');

  if (CONFIG.ticketsLive) {
    // Live — show ticket buttons
    if (navBtn) {
      navBtn.href        = CONFIG.ticketUrl;
      navBtn.textContent = 'Get tickets';
      navBtn.removeAttribute('target');
    }
    if (menuBtn) {
      menuBtn.href        = CONFIG.ticketUrl;
      menuBtn.textContent = 'Get tickets';
    }
    if (fightStatus) {
      fightStatus.textContent = 'Available now — limited capacity';
    }
    if (heroBlock) {
      heroBlock.innerHTML = `
        <a href="${CONFIG.ticketUrl}" class="btn-primary">
          Get tickets
        </a>`;
    }
    if (fightBlock) {
      fightBlock.innerHTML = `
        <a href="${CONFIG.ticketUrl}" class="btn-primary">
          Get tickets
        </a>`;
    }

  } else {
    // Not live — show notify me capture
    if (navBtn) {
      navBtn.href        = '#fight';
      navBtn.textContent = 'Notify me';
    }
    if (menuBtn) {
      menuBtn.href        = '#fight';
      menuBtn.textContent = 'Notify me';
    }
    if (fightStatus) {
      fightStatus.textContent = 'Dropping soon · limited capacity';
    }
    if (heroBlock)  heroBlock.innerHTML  = captureHTML('hero-form',  true);
    if (fightBlock) fightBlock.innerHTML = captureHTML('fight-form', false);

    ['hero-form', 'fight-form'].forEach(id => {
      const form = document.getElementById(id);
      if (form) form.addEventListener('submit', handleCapture);
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
      <span class="ticket-urgency">
        Limited capacity · be first to know when tickets go live
      </span>
    </div>`;
}

function handleCapture(e) {
  e.preventDefault();
  const form  = e.currentTarget;
  const btn   = form.querySelector('button');
  const input = form.querySelector('input');

  form.classList.add('submitted');
  btn.textContent  = "You're on the list ✓";
  input.value      = '';
  input.disabled   = true;

  if (CONFIG.notifyMe.formspreeId !== 'YOUR_NOTIFY_ME_ID') {
    fetch(`https://formspree.io/f/${CONFIG.notifyMe.formspreeId}`, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form),
    });
  }
}

buildTicketBlocks();
  