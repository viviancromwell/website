---
name: design-rules
description: Project-specific design rules for Vivian's portfolio website. ALWAYS follow these rules when editing CSS, HTML, Astro components, or managing images/assets. Enforces design tokens, image handling, folder conventions, and aesthetic preferences.
---

# Vivian's Design Rules

These rules are mandatory for all code changes in this project.

## Images

- **No border-radius on images.** Never add `border-radius` to `img` elements or image containers.
- **No rounded corners on cards containing images** unless explicitly requested.
- **Eager-load above-the-fold images.** Use `loading="eager"` for hero images and the first row of gallery grids (typically `i < 4`). Use `loading="lazy"` for everything else.
- **Detail pages** (painting, project) have a single hero image — always `loading="eager"`.
- **All images must have descriptive `alt` text.**
- **No redundant words in `alt` text.** Never use "image", "photo", "picture", or "photography" — screen readers already announce `img` elements as images.

## Asset Organization

- **Single source of truth: `src/assets/`**. All images live in `src/assets/<section>/` subfolders.
- **Never create image folders outside `src/assets/`** (no root-level `paintings/`, `images/`, etc.).
- **Never duplicate images** between locations.
- **Follow the paintings pattern** for all content sections:
  - `src/assets/paintings/` → painting images + data
  - `src/assets/projects/<project-id>/` → project gallery images
  - New sections follow same pattern: `src/assets/<section-name>/`
- **Gallery subfolders** use the content item's `id` as the folder name.
- **Drop-in workflow**: User drops images into folders; Astro's `import.meta.glob` + `<Image>` handles optimization automatically.

## Design Tokens (from `css/tokens.css`)

- **All** colors, font sizes, spacing, radii, and shadows must use `var(--*)` tokens.
- **Never hardcode** `#hex`, `rgb()`, `px` font-size, `px` margin/padding/gap values.
- **Allowed exceptions**: `0`, `1px` (borders), `100%`, `auto`, `50%` (centering), z-index, structural calc values.
- Font pairing: `--font-display` (Cormorant Garamond) for headings, `--font-body` (Instrument Sans) for body/UI.

## Layout

- **Max page width**: `var(--max-width-page)` (1200px), centered with `margin: 0 auto`.
- **Mobile-first** responsive design using `min-width` breakpoints.
- **No CSS frameworks** (no Tailwind, Bootstrap, etc.).
- **No inline styles** in HTML.

## Code Conventions

- BEM-inspired class naming: `.component-element` pattern.
- Vanilla HTML/CSS/JS only — no JavaScript frameworks.
- When creating new pages/components, **check existing patterns first** and replicate them exactly.

## Accessibility & Contrast

- **WCAG AA contrast ratios are mandatory**: 4.5:1 for body text, 3:1 for large text (18px+ bold or 24px+ regular).
- After changing any color token or font weight, **run a contrast ratio check** using this Python snippet:
  ```python
  python3 -c "
  def luminance(h):
      r,g,b = int(h[1:3],16)/255, int(h[3:5],16)/255, int(h[5:7],16)/255
      def lin(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
      return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
  def contrast(a,b):
      l1,l2=luminance(a),luminance(b)
      if l1<l2: l1,l2=l2,l1
      return (l1+0.05)/(l2+0.05)
  bg='#FAF8F5'
  for name,fg in [('text','#3D3630'),('secondary','#7A6F65'),('muted','#8A7F74')]:
      r=contrast(fg,bg); print(f'{name}: {r:.1f}:1 ({\"PASS\" if r>=4.5 else \"FAIL\"} body, {\"PASS\" if r>=3 else \"FAIL\"} large)')
  "
  ```
- Check **both light and dark mode** tokens (swap `bg` and color values for dark mode).
- If a color fails, darken (light mode) or lighten (dark mode) until it passes.
- **Font weight affects perceived contrast** — thinner weights need higher contrast ratios.

## Link Audit

- **Before committing**, verify all links in changed files:
  - **Internal links** (`href="/..."`): Confirm target page exists in `src/pages/`
  - **External links** (`https://...`): Fetch and check for 404, DNS failures, timeouts
  - **Asset links** (`src="/audio/..."`, `/css/...`): Confirm files exist in `public/`
- Report broken links with file location, the broken URL, and a suggested fix.
- **Do not auto-fix** external URLs — report to the user since URLs may have moved.

## Gallery Pages

- Use `import.meta.glob` to load images from `src/assets/<section>/<id>/`.
- Use Astro `<Image>` component with responsive `widths` and `sizes`.
- Lightbox: pass original URL via `data-full={img.src}` attribute.
- Masonry layout with `columns` CSS property, responsive breakpoints.
