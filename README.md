# Masculine Path · landing page

The site at masculinepath.men. One page with three jobs, in this order: a hook, what Dragos helps
with, and a way to book the free first session (The Honest Read).

Static HTML, CSS and vanilla JS. No build step, no dependencies. Vercel deploys this repo:
a push to `main` goes to production, any other branch gets a preview.

## Files

- `index.html` · the page: hero, what I help with (feeling behind, 5 moments, the gap, 5 areas),
  about Dragos, the free first session (3 steps and prices), who it is and isn't for, FAQ, and
  the closing CTA (button, Instagram line, Cal.com calendar), footer
- `style.css` · brand palette and type (Cormorant Garamond + Satoshi), mobile first
- `script.js` · booking link wiring, the optional Cal.com inline embed, quiet scroll reveals
- `favicon.svg` · the single copper stroke
- `og.png` · 1200x630 social preview image

## The booking link lives in one place

`script.js`, top of the file:

```js
const BOOKING_URL = "https://cal.com/dragos-masculinepath/free-session";
const INLINE_EMBED = true;
```

Every "Book a free session" button gets its link from `BOOKING_URL`. When it is a cal.com
link and `INLINE_EMBED` is true, the Cal.com inline calendar loads under the final CTA (lazily,
when that section comes near the viewport), using the same event, dark theme and the copper
accent. Set `INLINE_EMBED` to `false` to keep the buttons only. If `BOOKING_URL` ever contains
`REPLACE-ME`, the buttons fall back to the Instagram DM link and the embed stays hidden.

## Editing copy

The copy is written to the brand's voice and claims rules (no outcome promises, no therapy
language, pro-man and never anti-woman). The approved text is kept in Dragos's project folder,
not in this repo. Change copy there first, then here.

## Accessibility and performance notes

- Semantic landmarks, one `h1`, skip link, visible focus rings
- Stone (`#7a7570`) is only used for decorative lines: it fails WCAG AA for body-size text on the
  background, so small secondary copy uses `--text-soft` (`#b3aea7`) instead
- `prefers-reduced-motion` turns off the reveals and button motion; content is visible without JS
- Two font requests (Google Fonts, Fontshare), no images in the page body, grain is an inline SVG
