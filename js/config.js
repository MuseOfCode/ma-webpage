const CONFIG = {

  // ── Fighter ────────────────────────────────────────────────
  fighterName:   'Mitchell Asare',
  fighterHandle: 'mitchellasare',

  // ── Fight ──────────────────────────────────────────────────
  fightDate:     '2026-06-27T18:00:00',
  venue:         'HARROW LESUIRE CENTRE',
  venueAddress:  'Christchurch Ave, Harrow HA3 5BD',
  doorsOpen:     '17:00 PM',
  firstBout:     '18:30',

  // ── Tickets ────────────────────────────────────────────────
  ticketsLive:   false,
  ticketUrl:     'tickets.html',

  tickets: {
    standard: {
      price:       50,
      label:       'General Admission',
      remaining:  1,
      capacity:    100,
      soldOut: false,
      tailor_url:  'ticket tailor url',
    },
    premium: {
      price:       90,
      label:       'Ringside VIP',
      remaining:   30,
      capacity:    30,
      soldOut: false,
      tailor_url:  'ticket tailer',
    },
  },

  // ── Social ─────────────────────────────────────────────────
  social: {
    instagram:   'https://www.instagram.com/mitchellasare/',
    tiktok:      'https://www.tiktok.com/@mitchasare',
    youtube:     '#',
  },

  // ── SEO / meta ─────────────────────────────────────────────
  meta: {
    siteUrl:     'https://yoursite.com',
    description: 'Mitchell Asare — 6x London Amateur Champion turning professional. Follow the journey, get tickets to the debut.',
    ogImage:     '/assets/images/og-image.jpg',
  },

  // ── Credentials ────────────────────────────────────────────
  credentials: ['6x London Champion', '70+ fights', 'Pro debut'],

  // ── Forms ──────────────────────────────────────────────────
  newsletter: {
    formspreeId: 'YOUR_NEWSLETTER_ID',
  },

  notifyMe: {
    formspreeId: 'YOUR_NOTIFY_ME_ID',
  },

   born:        'London, England',
  weightClass: 'Lightweight',
  stance:      '???',
  gym:         'Whiteheart Lane',
  trainer:     '???',

};

window.CONFIG = CONFIG;