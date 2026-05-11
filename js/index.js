

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

    
const video   = document.querySelector('.scroll-video');
const unmuteBtn = document.getElementById('unmute-btn');

// Intersection observer — play/pause on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play();
    } else {
      video.pause();
    }
  });
}, { threshold: 0.4 });

observer.observe(video);

// Unmute toggle
unmuteBtn.addEventListener('click', () => {
  video.muted = !video.muted;

  // Swap icons
  unmuteBtn.querySelector('.icon-muted').style.display  = video.muted ? '' : 'none';
  unmuteBtn.querySelector('.icon-unmuted').style.display = video.muted ? 'none' : '';

  // If video somehow paused, restart it
  if (video.paused) video.play();
});


// index.js
// function handleNewsletter(e) {
//   e.preventDefault();
//   const form  = e.target;
//   const btn   = form.querySelector('button');
//   const input = form.querySelector('input');

//   btn.textContent = 'Subscribing…';
//   btn.disabled    = true;

//   if (CONFIG.newsletter.formspreeId !== 'YOUR_NEWSLETTER_ID') {
//     fetch(`https://formspree.io/f/${CONFIG.newsletter.formspreeId}`, {
//       method:  'POST',
//       headers: { 'Accept': 'application/json' },
//       body:    new FormData(form),
//     }).then(() => showSuccess()).catch(() => showSuccess());
//   } else {
//     setTimeout(showSuccess, 600);
//   }

//   function showSuccess() {
//     btn.textContent       = 'Subscribed ✓';
//     btn.style.background  = '#1D9E75';
//     btn.style.borderColor = '#1D9E75';
//     btn.style.color       = '#fff';
//     input.value           = '';
//   }
// }

// index.js
function applyFightMeta() {
  const date = new Date(CONFIG.fightDate);
  const formatted = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  });

  // Update any element with data-fight attributes
  document.querySelectorAll('[data-fight="date"]')
    .forEach(el => el.textContent = formatted);
  document.querySelectorAll('[data-fight="venue"]')
    .forEach(el => el.textContent = CONFIG.venue);
  document.querySelectorAll('[data-fight="doors"]')
    .forEach(el => el.textContent = CONFIG.doorsOpen);
}

applyFightMeta();

// Swap hero image on mobile
function applyHeroImage() {
  const img = document.getElementById('hero-img');
  if (!img) return;
  if (window.matchMedia('(max-width: 480px)').matches && img.dataset.mobile) {
    img.src = img.dataset.mobile;
  }
}
applyHeroImage();