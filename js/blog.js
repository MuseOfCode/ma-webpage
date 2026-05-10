
    // ── Post count ────────────────────────────────────────────────
    const allPosts = document.querySelectorAll('[data-category]');
    document.getElementById('post-count').textContent = `${allPosts.length} posts`;

    // ── Category filter ───────────────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const featured   = document.querySelector('.post-featured');
    const gridPosts  = document.querySelectorAll('#blog-grid .post-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Featured post
        if (featured) {
          const show = filter === 'all' || featured.dataset.category === filter;
          featured.style.display = show ? 'grid' : 'none';
        }

        // Grid posts
        gridPosts.forEach(post => {
          const show = filter === 'all' || post.dataset.category === filter;
          post.style.display = show ? 'flex' : 'none';
        });
      });
    });

