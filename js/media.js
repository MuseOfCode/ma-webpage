

    // ── Tab switching ─────────────────────────────────────────────
    const tabBtns       = document.querySelectorAll('.tab-btn');
    const sectionPhotos = document.getElementById('section-photos');
    const sectionVideos = document.getElementById('section-videos');
    const filterBar     = document.getElementById('filter-bar');

    const videoFilters = ['all', 'training', 'fight', 'behind'];
    const photoFilters = ['all', 'training', 'fight', 'portrait', 'behind'];

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        if (tab === 'photos') {
          sectionPhotos.classList.remove('hidden');
          sectionVideos.classList.add('hidden');
          updateFilters(photoFilters);
        } else {
          sectionVideos.classList.remove('hidden');
          sectionPhotos.classList.add('hidden');
          updateFilters(videoFilters);
        }

        // Reset filter to all
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        applyFilter('all');
      });
    });

    function updateFilters(filters) {
      filterBar.innerHTML = '<span class="filter-label">Filter</span>';
      filters.forEach(f => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (f === 'all' ? ' active' : '');
        btn.dataset.filter = f;
        btn.textContent = f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ');
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          applyFilter(f);
        });
        filterBar.appendChild(btn);
      });
    }

    function applyFilter(filter) {
      const activeSection = sectionPhotos.classList.contains('hidden') ? sectionVideos : sectionPhotos;
      activeSection.querySelectorAll('[data-category]').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });
    }

    // Initial filter wiring
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
      });
    });

    // ── Lightbox ──────────────────────────────────────────────────
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightbox-img');
    const lightboxCap  = document.getElementById('lightbox-caption');
    const lightboxCtr  = document.getElementById('lightbox-counter');

    let currentIndex   = 0;
    let visiblePhotos  = [];

    function getVisiblePhotos() {
      return [...document.querySelectorAll('#photo-grid .photo-item')]
        .filter(el => el.style.display !== 'none');
    }

    function openLightbox(index) {
      visiblePhotos = getVisiblePhotos();
      currentIndex  = index;
      showPhoto(currentIndex);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    function showPhoto(index) {
      const item = visiblePhotos[index];
      if (!item) return;

      const img = item.querySelector('img');
      // If placeholder, show a grey box; if real image, show it
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      } else {
        // No real image yet — show placeholder state
        lightboxImg.src = '';
        lightboxImg.style.display = 'none';
      }

      lightboxCap.textContent = item.dataset.caption || '';
      lightboxCtr.textContent = `${index + 1} / ${visiblePhotos.length}`;
    }

    function prevPhoto() {
      currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
      showPhoto(currentIndex);
    }

    function nextPhoto() {
      currentIndex = (currentIndex + 1) % visiblePhotos.length;
      showPhoto(currentIndex);
    }

    // Wire photo items to lightbox
    document.getElementById('photo-grid').addEventListener('click', (e) => {
      const item = e.target.closest('.photo-item');
      if (!item) return;
      visiblePhotos = getVisiblePhotos();
      const index = visiblePhotos.indexOf(item);
      if (index !== -1) openLightbox(index);
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', prevPhoto);
    document.getElementById('lightbox-next').addEventListener('click', nextPhoto);

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    });

    // ── Load more (placeholder behaviour) ────────────────────────
    document.getElementById('load-more-btn').addEventListener('click', function() {
      this.textContent = 'All photos loaded';
      this.disabled = true;
      this.style.opacity = '0.3';
      // When you have more photos, unhide them here instead
    });

    // ── MP4 video players ─────────────────────────────────────────
function initVideoPlayers() {
  document.querySelectorAll('.media-video').forEach(video => {
    const card = video.closest('.video-card');

    video.addEventListener('click', () => toggleVideo(video, card));

    // Show play button again when video ends
    video.addEventListener('ended', () => {
      card.classList.remove('playing');
      video.currentTime = 0;
    });
  });
}

function toggleVideo(video, card) {
  // Pause all other videos first
  document.querySelectorAll('.media-video').forEach(v => {
    if (v !== video && !v.paused) {
      v.pause();
      v.closest('.video-card').classList.remove('playing');
    }
  });

  if (video.paused) {
    video.play();
    card.classList.add('playing');
  } else {
    video.pause();
    card.classList.remove('playing');
  }
}

initVideoPlayers();