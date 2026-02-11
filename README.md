# Visual Studio Wallpapers

Beautiful wallpapers for your Desktop, Phone, and Watch — built with Blazor WebAssembly and .NET 10.

🌐 **Live site**: [visualstudiowallpapers.com](https://visualstudiowallpapers.com)

## Tech Stack

- **Framework**: [Blazor WebAssembly](https://learn.microsoft.com/aspnet/core/blazor/) (.NET 10)
- **Hosting**: GitHub Pages (static files)
- **CI/CD**: GitHub Actions (`dotnet publish` → Pages deploy)

## Local Development

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)

### Run locally
```bash
dotnet watch run
```
The site will be available at `https://localhost:5001` (or `http://localhost:5000`).

### Build
```bash
dotnet build
```

### Publish
```bash
dotnet publish -c Release -o release
```
Output is in `release/wwwroot/`.

## Project Structure

```
website/
├── Pages/              # Blazor page components (Index, Desktop, Phone, Watch, Archive, SweepstakesRules)
├── Shared/             # Shared components (MainLayout, PreviewModal, WallpaperGrid, Pagination)
├── Services/           # Services (ThemeService)
├── Data/               # Static data classes (WallpaperSizes)
├── wwwroot/            # Static assets
│   ├── wallpapers/     # Wallpaper images (desktop, phone, watch, archive)
│   ├── favicons/       # Favicon files
│   ├── icons/          # Theme toggle icons
│   ├── js/             # JavaScript interop files
│   └── index.html      # Blazor host page
├── website.csproj      # Project file
├── Program.cs          # App entry point
├── App.razor           # Root component with router
└── _Imports.razor      # Global using directives
```

## Features

- 🖥️ Desktop wallpapers (4K, Ultrawide, and more)
- 📱 Phone wallpapers (iPhone & Android sizes)
- ⌚ Watch wallpapers (Apple Watch)
- 📁 Community Archive (137 classic wallpapers)
- 🎨 Theme toggle (VS Purple / VS Code Blue)
- ♿ Full keyboard accessibility
- 📱 Responsive design
- 🔍 SEO meta tags and Open Graph support

## License

See [LICENSE](LICENSE) for details.