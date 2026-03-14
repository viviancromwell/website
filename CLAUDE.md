# Project Guidelines

## Design Principles
- Minimalist, modern, editorial aesthetic
- Design-token driven — all values (colors, typography, spacing) must come from `css/tokens.css`
- No hardcoded colors, font sizes, or spacing values in component styles
- Font pairing: Cormorant Garamond (display/headings) + Instrument Sans (body/UI)

## Performance
- Minimal dependencies; prefer native browser APIs
- Images must be lazy-loaded (`loading="lazy"`) and use modern formats (WebP/AVIF with fallback)
- Fonts loaded via `preconnect` + `display=swap` to avoid render blocking
- Keep total page weight under 500KB (excluding images)

## Accessibility
- Semantic HTML elements (`nav`, `main`, `header`, `article`, `section`)
- All interactive elements must be keyboard accessible
- ARIA labels on buttons and toggles that lack visible text
- Color contrast must meet WCAG AA (4.5:1 for body text, 3:1 for large text)
- Skip-to-content link for keyboard users
- Alt text on all images
- Respect `prefers-reduced-motion` and `prefers-color-scheme`

## Code Style
- No CSS frameworks (Tailwind, Bootstrap, etc.)
- BEM-inspired class naming (`.site-header`, `.nav-link`, `.dropdown-toggle`)
- Mobile-first responsive design
- Do not open browser windows — user previews via localhost
