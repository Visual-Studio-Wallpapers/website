# Visual Studio Wallpapers

Beautiful wallpapers for your Desktop, Phone, and Watch — built with React, Vite, and TypeScript.

🌐 **Live site**: [visualstudiowallpapers.com](https://visualstudiowallpapers.com)

## Features

- 🖥️ **Desktop wallpapers** — 25 wallpapers in 4K, Ultrawide, 1080p, and 720p
- 📱 **Phone wallpapers** — 25 wallpapers for iPhone and Android screen sizes
- ⌚ **Watch wallpapers** — 24 wallpapers for Apple Watch and more
- 🗂️ **Community archive** — 138 archived wallpapers from the VS2010 Wallpapers Blog
- 🎨 **Theme toggle** — Switch between VS Purple and VS Code Blue themes
- 🌙 **Dark mode** — Automatic via `prefers-color-scheme`
- ♿ **Accessible** — WCAG 2.1 AA: skip link, focus traps, keyboard navigation, screen reader support, reduced motion

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Build | [Vite](https://vite.dev) |
| Routing | [React Router v7](https://reactrouter.com) |
| SEO | [react-helmet-async](https://github.com/staylor/react-helmet-async) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) |
| Hosting | [GitHub Pages](https://pages.github.com) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Generate the wallpaper manifest (scans public/wallpapers/)
npm run generate-manifest

# Start the dev server
npm run dev
```

The site opens at `http://localhost:5173/visualstudio-wallpapers/`.

### Build for Production

```bash
npm run build     # generates manifest automatically via prebuild hook
npm run preview   # preview the production build locally
```

Output goes to `dist/`.

## Project Structure

```
├── index.html                  # Vite entry point
├── vite.config.ts              # Vite config (base: /visualstudio-wallpapers/)
├── package.json
├── tsconfig.json
│
├── public/                     # Static assets (copied as-is to dist/)
│   ├── wallpapers/
│   │   ├── desktop/            # thumbnails/ + size folders (1280x720, 1920x1080, etc.)
│   │   ├── phone/              # size folders (320x568 … 430x932)
│   │   ├── watch/              # 368x448/
│   │   └── archive/            # full images + thumbnail/
│   ├── favicons/
│   ├── icons/                  # VS and VS Code theme icons
│   ├── CNAME
│   ├── 404.html                # SPA fallback for GitHub Pages
│   └── sweepstakesrules/
│
├── scripts/
│   └── generate-manifest.js    # Scans wallpapers → src/data/wallpaper-manifest.json
│
└── src/
    ├── main.tsx                # React entry
    ├── App.tsx                 # Router + providers
    ├── index.css               # Global styles, CSS custom properties, dark mode
    │
    ├── components/
    │   ├── Layout.tsx          # Shell: nav, header, footer, theme toggle
    │   ├── WallpaperGrid.tsx   # Reusable gallery grid
    │   ├── PreviewModal.tsx    # Accessible image preview modal
    │   └── DownloadOptions.tsx # Device-aware download UI
    │
    ├── contexts/
    │   └── ThemeContext.tsx     # VS Purple ↔ VS Code Blue theme + localStorage
    │
    ├── data/
    │   ├── sizes.ts            # Device download sizes (typed)
    │   └── wallpaper-manifest.json  # Auto-generated image manifest
    │
    └── pages/
        ├── Home.tsx
        ├── Desktop.tsx
        ├── Phone.tsx
        ├── Watch.tsx
        ├── Archive.tsx
        └── SweepstakesRules.tsx
```

## Adding Wallpapers

1. Add the image file to `public/wallpapers/<device>/<size>/` — use a **zero-padded numeric filename** (e.g., `026.jpg`) and ensure the same filename exists in every size folder for that device.
2. For desktop wallpapers, also add a thumbnail to `public/wallpapers/desktop/thumbnails/`.
3. Run `npm run generate-manifest` to regenerate the manifest (this happens automatically on `npm run build`).
4. If you add a **new resolution folder**, update `src/data/sizes.ts` to include it.

## Adding a New Device Size

1. Create the folder in `public/wallpapers/<device>/<new-size>/` and add images.
2. Add the size string to the appropriate array in `src/data/sizes.ts`.
3. Regenerate the manifest: `npm run generate-manifest`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`) which:

1. Installs Node.js 20 dependencies
2. Generates the wallpaper manifest
3. Runs `vite build`
4. Deploys `dist/` to GitHub Pages

Client-side routing on GitHub Pages is handled by the `public/404.html` SPA redirect.

## Accessibility

The site targets WCAG 2.1 AA compliance:

- **Skip link** jumps past navigation to main content
- **Keyboard navigation** — Tab through all interactive elements; Enter/Space to open cards; Arrow keys in preview modal; Escape to close
- **Focus management** — Visible focus indicators on all controls; focus trapped in modals; focus restored on close
- **Screen readers** — Semantic landmarks, meaningful alt text, `aria-current="page"`, `aria-live` for dynamic content
- **Reduced motion** — All animations and transitions disabled when `prefers-reduced-motion: reduce` is set

## License

See [LICENSE](LICENSE) for details.