---
name: optimize-image
description: Downloads an image from a URL (Pexels, Unsplash, or any direct image link), resizes it for web use, and converts it to WebP, saving the result under public/ so the site serves it locally instead of hitting an external image host at request time. Use this whenever the user wants to add, replace, or localize a stock/hero/menu/avatar image, mentions pulling an image from Pexels or another image bank, wants to convert an image to WebP, or wants to stop depending on a remote image host (e.g. remove a next.config.ts remotePatterns entry).
---

# Optimize Image

Fetches a remote image and produces a resized, WebP-encoded local copy in
`public/`, so pages can reference it with a plain local path instead of a
remote URL. This removes a runtime dependency on the external host (e.g.
`images.pexels.com`) and ships a smaller file.

## Why local + WebP

- **No runtime fetch to a third party.** Once the file lives in `public/`,
  Next.js serves it directly — no dependency on Pexels/Unsplash staying up,
  rate limits, or `next.config.ts` `images.remotePatterns` entries.
- **WebP is smaller than JPEG/PNG at the same visual quality**, which speeds
  up page loads.
- **Resizing to the actual display size** avoids shipping a 4000px-wide photo
  for a 400px card.

## Workflow

1. **Get the source URL.** For Pexels, use the direct photo URL (the kind
   already used in this project, e.g.
   `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`). Any
   `https://` URL that returns image bytes works — Unsplash `images.unsplash.com`
   links included.

2. **Pick a width and a destination folder** based on how the image is used.
   Don't just keep the source size — resize to roughly what the layout needs
   (2x the largest rendered size is enough headroom for retina screens).
   This project's existing conventions:

   | Usage                                   | Suggested width | Suggested `--dir`        |
   |------------------------------------------|-----------------|---------------------------|
   | Hero / full-bleed banner (`sizes="100vw"`)| 1920            | `public/images/hero`      |
   | Menu item card / grid photo               | 800             | `public/images/menu`      |
   | Avatar / small thumbnail                  | 200             | `public/images/avatars`   |

   Use your judgment for anything that doesn't fit these — check how the
   `<Image>` component that will use the file is sized (its `sizes` prop,
   container width, `fill` usage) rather than guessing.

3. **Run the script** from the repo root:

   ```
   node .claude/skills/optimize-image/scripts/optimize-image.mjs <image-url> <output-name> [--width=1600] [--quality=80] [--dir=public/images]
   ```

   - `<output-name>` — filename without needing `.webp`; the script appends it
     (and strips any other extension you pass).
   - `--width` — resize to this pixel width, preserving aspect ratio. Omit to
     keep the source width (only do this if the source is already
     appropriately sized — check first).
   - `--quality` — WebP quality, 1–100. Default `80` is a good general
     tradeoff; drop to `65-70` for large hero images if file size matters
     more than crispness, raise toward `90` for images with fine detail like
     text or logos.
   - `--dir` — output folder, relative to the repo root. Default
     `public/images`. The folder is created if it doesn't exist.

   Example:

   ```
   node .claude/skills/optimize-image/scripts/optimize-image.mjs \
     "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" \
     latte-hero --width=1920 --quality=80 --dir=public/images/hero
   ```

   The script prints the saved path, final dimensions, file size, and the
   web-accessible path to reference (e.g. `/images/hero/latte-hero.webp`).

4. **Update the code** to use the local path instead of the remote URL, e.g.
   swap:

   ```tsx
   <Image src={`https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?...`} ... />
   ```

   for:

   ```tsx
   <Image src="/images/hero/latte-hero.webp" ... />
   ```

   A local path under `public/` needs no `width`/`height` when used with
   `fill`, same as a remote one.

5. **Clean up now-unused remote config.** If, after this change, nothing in
   the codebase still loads images from a given remote host, check
   `next.config.ts`'s `images.remotePatterns` and remove the now-unnecessary
   entry (e.g. the `images.pexels.com` pattern). Grep for the hostname first
   to confirm nothing else still depends on it.

## Notes

- The script downloads with `fetch`, verifies the response is actually an
  image via `Content-Type`, auto-orients using EXIF before stripping
  metadata, resizes with `sharp` (never upscales past the source size), and
  encodes to WebP.
- Only `https://` sources are accepted — this is a deliberate restriction to
  avoid feeding the script arbitrary internal/local URLs.
- `sharp` is already available in this project (used by Next.js's own image
  optimizer) — no extra install needed.
