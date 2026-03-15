---
name: audit-writing
description: Audit a writing/blog post page for typography, layout, image, and style consistency issues. Use after creating or editing an article page. Trigger on "audit writing", "check article", "audit blog post", or after creating a new writing page.
user_invocable: true
---

# Writing Page Audit

Run this audit on any writing/article page in `src/pages/writings/`. Check every rule below and report violations with file path, line number, and fix.

## Typography Consistency

1. **Font loading**: Every font-weight used in CSS must be loaded in `src/layouts/Base.astro` Google Fonts link. Cross-reference all `font-weight` values in the page's `<style>` block against the loaded weights.
   - Cormorant Garamond: check which weights are loaded
   - Instrument Sans: check which weights are loaded
   - Flag any weight used but not loaded (causes browser synthesis = inconsistent rendering)

2. **Font family assignments**:
   - Headings (h1, h2, h3): must use `var(--font-display)`
   - Body text (p, li, figcaption): must use `var(--font-body)` or inherit from `.article-body`
   - No raw font-family strings — must use token variables

3. **Type scale**: All font-size values must use `var(--text-*)` tokens. No hardcoded px/rem/em.

4. **Line height**: Must use `var(--leading-*)` tokens.

## Spacing & Layout

5. **Spacing values**: All margin, padding, and gap values must use `var(--space-*)` tokens. Allowed exceptions: `0`, `auto`.

6. **Article max-width**: Article body should be constrained to a readable width (600-800px range). Check `max-width` is set.

7. **Image spacing**: `<figure>` elements should have consistent vertical margin. Check all `.article-image` margins are uniform.

8. **Section spacing**: H2 headings should have larger top margin than bottom margin to visually group with their content.

## Images

9. **Loading attribute**:
   - First 2 images: `loading="eager"` (above the fold)
   - All others: `loading="lazy"`

10. **Alt text**: Every `<Image>` must have descriptive alt text. No empty alt="" unless purely decorative. No redundant words (image, photo, picture, photography).

11. **Responsive sizes**: Every `<Image>` must have `widths` and `sizes` attributes for responsive loading.

12. **Figcaption**: If an image has a caption, it must be inside a `<figure>` with `<figcaption>`. Captions should use `var(--text-sm)` and `var(--color-text-muted)`.

## Color & Contrast

13. **Color tokens**: All color values must use `var(--color-*)` tokens. No hardcoded hex/rgb.

14. **Text hierarchy**:
    - Title: `var(--color-text)`
    - Body: `var(--color-text-secondary)`
    - Meta/dates/tags: `var(--color-text-muted)`
    - Verify this hierarchy is maintained

## Structure & Semantics

15. **HTML structure**: Article must use `<article>` wrapper with `<header>` for title/meta and `<footer>` for tags.

16. **Heading hierarchy**: Must go h1 → h2 sequentially. No skipped levels.

17. **Date format**: Must use `<time>` element with `datetime` attribute in ISO format.

18. **Back link**: Page should have a "Back to Writings" link consistent with other detail pages (`.painting-back` / `.back-link` pattern).

## Content Integrity

19. **Data consistency**: Article metadata in `src/data/writings.json` must match the page:
    - Title matches h1
    - Date matches `<time datetime="">`
    - Category matches URL path segment
    - Tags match rendered tags

20. **URL structure**: Page must be at `/writings/[category]/[slug]` matching the `id` and `category` in `writings.json`.

## Content Placement (Migrated Articles)

21. **Image placement verification**: For articles migrated from an external source, fetch the original URL and compare the exact element ordering (heading → paragraph → image sequence). Every image must appear in the same position relative to surrounding text as the original. Common mistakes:
    - Image placed before a paragraph when it should be after (or vice versa)
    - Intro text merged into one paragraph when the original had multiple
    - Captions rendered as `<figcaption>` when the original used a regular paragraph
    - Two separate paragraphs combined into one

22. **Source URL field**: If the article was migrated, `writings.json` should include a `source` field with the original URL for future reference and verification.

## Output Format

For each violation found:
```
[FAIL] Rule #N: description
  File: path/to/file.astro:LINE
  Found: what's wrong
  Fix: what to change
```

For passing rules: `[PASS] Rule #N: description`

End with a summary: `X/20 rules passed, Y violations found`
