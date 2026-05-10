

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


