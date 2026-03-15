---
name: migrate-writing
description: Migrate a blog post from an external URL to this Astro site. Handles content extraction, image downloading, and page creation with exact layout matching. Use when migrating articles from viviancromwell.com, Medium, or thetipsymuse.com.
user_invocable: true
---

# Blog Post Migration

Migrate an article from an external URL into `src/pages/writings/[category]/[slug].astro`.

## Process

### Step 1: Two-Pass Content Extraction

**Pass 1 — Full content:** Fetch the URL and extract all text content, headings, metadata (date, category, tags, likes).

**Pass 2 — Element ordering:** Fetch the URL again with a prompt focused ONLY on the exact sequence of elements. For every element, return:
- Sequential number
- Type: heading / paragraph / image
- First 10 words of text OR image filename
- Whether the text is a short caption-style line (1 sentence) vs a full paragraph

This two-pass approach prevents the #1 migration error: images placed in the wrong position relative to text.

### Step 2: Download Images

- Save all images to `src/assets/writings/[slug]/`
- Name them sequentially with descriptive names: `01-description.jpg`
- Use `curl -L` to follow redirects
- Verify all downloads completed with correct file sizes (> 10KB)

### Step 3: Create the Page

Use the Mosuo article as the reference template: `src/pages/writings/travel/mosuo-the-last-matriarchy-in-china.astro`

**Critical rules:**
- Import every image individually at the top of the frontmatter
- Use `<Image>` component from `astro:assets` with `widths` and `sizes`
- First 2 images: `loading="eager"`, all others: `loading="lazy"`
- Article wrapped in `<article class="article">`
- Header with title, date (using `<time datetime="">`), reading time, and category link
- Footer with clickable tags and like count

**Content rules — DO NOT:**
- Merge separate paragraphs into one. If the original has two `<p>` tags, keep them as two.
- Use `<figcaption>` unless the original explicitly uses a caption element. Short descriptive lines after images in the original are regular `<p>` tags, not captions.
- Reorder any elements. The sequence of headings, paragraphs, and images must exactly match the original.
- Add content that doesn't exist in the original.

**Content rules — DO:**
- Split the intro if the original has multiple paragraphs before the first heading.
- Place images exactly where they appear in the original element sequence.
- Use the exact same heading text as the original.
- Preserve all paragraph text verbatim.

### Step 4: Update writings.json

Add an entry to `src/data/writings.json` with:
```json
{
  "id": "slug-from-url",
  "title": "Exact Title",
  "date": "YYYY-MM-DD",
  "category": "category-name",
  "tags": ["tag1", "tag2"],
  "likes": N,
  "readingTime": N,
  "summary": "First 1-2 sentences of the article.",
  "source": "https://original-url"
}
```

### Step 5: Restart Dev Server

After creating the page and updating JSON, restart the dev server:
```bash
pkill -f "astro dev" 2>/dev/null; sleep 1 && npx astro dev --port 4321 &
```

### Step 6: Verify

- Confirm the page loads (HTTP 200)
- Count images on the page matches the original
- Reading time is calculated from word count (~200 words/min)

### Step 7: Run Audit

After migration is complete, run `/audit-writing` on the newly created page to catch any style, typography, spacing, or layout issues. Fix all violations before considering the migration done.

## Category Mapping

| Original tag/category | URL segment |
|---|---|
| Travel, Photography (travel content) | travel |
| Tech, Startup, Design | tech |
| Photography (non-travel) | photography |
| Parenting | parenting |
| Wine, Cocktail | wine-spirits |

## Reference

- Template: `src/pages/writings/travel/mosuo-the-last-matriarchy-in-china.astro`
- Styles: Copy the `<style>` block from the template — all articles share the same styles
- Data: `src/data/writings.json`
- Images: `src/assets/writings/[slug]/`
