# Copilot instructions for `website`

## Project snapshot
- This repo is a **Jekyll** site published on **GitHub Pages**.
- Site-wide config lives in `_config.yml` (notably `baseurl: /visualstudio-wallpapers`).
- Most pages are top-level HTML files with Jekyll front matter: `index.html`, `desktop.html`, `phone.html`, `watch.html`, `archive.html`.
- Shared layout/CSS/JS is in `_layouts/default.html` (nav + theme toggle + a11y helpers like skip link/focus styles).

## Local dev workflow
- Ruby/Jekyll deps are in `Gemfile`.
- Preferred local run is the VS Code task **“Serve Jekyll Site”** (`bundle exec jekyll serve`).

## URL + asset conventions (important for GH Pages)
- Use `{{ site.baseurl }}` when linking to pages/assets so paths work under the GitHub Pages subpath.
	- Example: `{{ site.baseurl }}/wallpapers/desktop/thumbnails/022.jpg` (see `index.html`).

## Wallpapers: file layout + naming
- Assets are served from `wallpapers/`.
- Desktop gallery renders from `wallpapers/desktop/thumbnails/*.jpg` (see `desktop.html`).
	- Downloads assume a matching filename exists at `wallpapers/desktop/<size>/<same-name>.jpg`.
- Phone gallery lists images from `wallpapers/phone/320x568/*.jpg` (see `phone.html`) and assumes the same filename exists in all phone size folders.
- Watch gallery lists images from `wallpapers/watch/368x448/*.jpg` (see `watch.html`).
- Community archive (`archive.html`) is JS-rendered with pagination; it expects `wallpapers/archive/###.jpg` and `wallpapers/archive/thumbnail/###.jpg` and uses a hard-coded `total_items` for page count.
- Keep filenames **consistent across sizes** and prefer **zero-padded numeric names** (e.g. `024.jpg`) because pages sort by `basename`.

## Device sizes source of truth
- Download size buttons are generated from `_data/sizes.yml` via `site.data.sizes.<device>`.
- If you add a new resolution folder, update `_data/sizes.yml` so UI download options match.

## SEO + accessibility patterns to preserve
- Pages may set `social_image` and `social_image_alt` in front matter; layout uses `{% seo %}`.
- Preserve keyboard accessibility patterns used in galleries/modals: Enter/Space handlers, focus trapping, and `prefers-reduced-motion` fallbacks.
- Default to semantic HTML, descriptive link text, and meaningful `alt` attributes.
