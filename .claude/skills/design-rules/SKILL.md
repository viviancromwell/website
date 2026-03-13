---
name: design-rules
description: Project-specific design rules for Vivian's portfolio website. ALWAYS follow these rules when editing CSS, HTML, Astro components, or managing images/assets. Enforces design tokens, image handling, folder conventions, and aesthetic preferences.
---

# Vivian's Design Rules

These rules are mandatory for all code changes in this project.

## Images

- **No border-radius on images.** Never add `border-radius` to `img` elements or image containers.
- **No rounded corners on cards containing images** unless explicitly requested.
- **All images must use `loading="lazy"`.**
- **All images must have descriptive `alt` text.**

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

## Gallery Pages

- Use `import.meta.glob` to load images from `src/assets/<section>/<id>/`.
- Use Astro `<Image>` component with responsive `widths` and `sizes`.
- Lightbox: pass original URL via `data-full={img.src}` attribute.
- Masonry layout with `columns` CSS property, responsive breakpoints.
