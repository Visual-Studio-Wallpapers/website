# Copilot instructions for `website`

## Project snapshot
- This repo is a **Blazor WebAssembly** standalone app targeting **.NET 10**, deployed to **GitHub Pages**.
- Project file is `website.csproj` (namespace: `VisualStudioWallpapers`).
- Pages are Blazor components in `Pages/`: `Index.razor`, `Desktop.razor`, `Phone.razor`, `Watch.razor`, `Archive.razor`, `SweepstakesRules.razor`.
- Shared layout and components are in `Shared/`: `MainLayout.razor`, `PreviewModal.razor`, `WallpaperGrid.razor`, `Pagination.razor`.

## Local dev workflow
- Run locally with `dotnet watch run`.
- Build with `dotnet build`.
- Publish with `dotnet publish -c Release -o release`.

## URL + asset conventions (important for GH Pages)
- Static assets are in `wwwroot/` and referenced with relative paths from `<base href="/visualstudio-wallpapers/">`.
- Wallpaper images: `wwwroot/wallpapers/{device}/{size}/{name}.jpg`.
- Use relative paths in components (e.g., `wallpapers/desktop/thumbnails/022.jpg`).

## Wallpapers: file layout + naming
- Assets are served from `wwwroot/wallpapers/`.
- Desktop gallery uses thumbnails from `wwwroot/wallpapers/desktop/thumbnails/*.jpg`.
  - Downloads use matching filenames at `wwwroot/wallpapers/desktop/{size}/{name}.jpg`.
- Phone gallery lists from `wwwroot/wallpapers/phone/320x568/*.jpg`, same filename in all phone size folders.
- Watch gallery lists from `wwwroot/wallpapers/watch/368x448/*.jpg`.
- Community archive expects `wwwroot/wallpapers/archive/{###}.jpg` and `wwwroot/wallpapers/archive/thumbnail/{###}.jpg`.
- Keep filenames **consistent across sizes** and prefer **zero-padded numeric names** (e.g., `024.jpg`).

## Device sizes source of truth
- Download size options are defined in `Data/WallpaperSizes.cs`.
- If you add a new resolution folder, update `WallpaperSizes.cs` so UI download options match.

## Architecture patterns
- **ThemeService** (`Services/ThemeService.cs`) manages VS Purple / VS Code Blue toggle via JS interop (`wwwroot/js/theme-interop.js`).
- **PreviewModal** (`Shared/PreviewModal.razor`) is a reusable modal with image preview, download options, keyboard navigation, focus trapping.
- **WallpaperGrid** (`Shared/WallpaperGrid.razor`) renders accessible wallpaper card grids.
- **Pagination** (`Shared/Pagination.razor`) handles archive page pagination.

## SEO + accessibility patterns to preserve
- Use `<PageTitle>` and `<HeadContent>` for per-page titles and meta tags.
- Preserve keyboard accessibility: Enter/Space handlers, focus trapping in modals, `prefers-reduced-motion` fallbacks.
- Use semantic HTML, descriptive link text, and meaningful `alt` attributes.
- All interactive elements must have ARIA labels and be keyboard-accessible.

## Deployment
- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages.
- The workflow publishes the app, adds `.nojekyll`, copies `index.html` to `404.html` for client-side routing.
- Custom domain: `visualstudiowallpapers.com` (CNAME in wwwroot).