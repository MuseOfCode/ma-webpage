// js/components.js
async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res  = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    el.outerHTML = html;
  } catch (err) {
    console.error('Component load error:', err);
  }
}

async function loadComponents() {
  await Promise.all([
    loadComponent('#nav-placeholder',    '/components/nav.html'),
    loadComponent('#footer-placeholder', '/components/footer.html'),
  ]);

  // Re-init nav JS after it's injected into the DOM
  if (typeof initNav === 'function') initNav();
}

loadComponents();