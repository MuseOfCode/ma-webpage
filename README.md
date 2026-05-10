---

## Config

All site-wide settings live in `/js/config.js`.
This is the only file you need to edit for:
- Fight date
- Ticket status (live or not)
- Social media URLs
- Ticket prices and remaining counts
- Formspree IDs for newsletter and notify me

---

## Going live checklist

- [ ] Replace all `[Fighter Name]` instances
- [ ] Set real `fightDate` in config.js
- [ ] Set real `venue` and `venueAddress` in config.js
- [ ] Add real social URLs in config.js
- [ ] Replace `og-image.jpg` with real image
- [ ] Add hero background images (desktop, iPad, mobile)
- [ ] Add `logo.png`
- [ ] Connect Formspree — add IDs to config.js
- [ ] Set up Ticket Tailor — add URLs to config.js
- [ ] Update `siteUrl` in config.js meta section
- [ ] Update canonical URLs in all page `<head>` tags
- [ ] Flip `ticketsLive: true` when tickets go live
- [ ] Write first blog post

---

## CSS files

| File | Purpose |
|------|---------|
| root.css | Variables, reset, global shared styles |
| nav.css | Nav, burger menu, footer |
| critical.css | Hero section (index only, above the fold) |
| local.css | Post-hero sections (index only) |
| blog.css | Blog page styles |
| media.css | Media page styles |
| tickets.css | Tickets page styles |

---

## JS files

| File | Purpose | Used on |
|------|---------|---------|
| config.js | Site-wide config | All pages |
| nav.js | Burger menu | All pages |
| countdown.js | Countdown timer | index, tickets |
| index.js | Homepage logic | index |
| blog.js | Filter, post count | blog |
| media.js | Tabs, filter, lightbox | media |
| ticket-page.js | FAQ, countdown, availability | tickets |
| post.js | Share buttons, copy link | blog posts |

---

## Deployment

Hosted on Netlify. Push to main branch to deploy.
Custom domain: yoursite.com