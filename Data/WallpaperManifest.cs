using System.Net.Http.Json;

namespace VisualStudioWallpapers.Data;

public class WallpaperManifest
{
    public string[] Desktop { get; set; } = [];
    public string[] Phone { get; set; } = [];
    public string[] Watch { get; set; } = [];
    public int ArchiveCount { get; set; }
}

public class WallpaperManifestService
{
    private readonly HttpClient _httpClient;
    private WallpaperManifest? _manifest;

    public WallpaperManifestService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<WallpaperManifest> GetManifestAsync()
    {
        _manifest ??= await _httpClient.GetFromJsonAsync<WallpaperManifest>("wallpaper-manifest.json")
                       ?? new WallpaperManifest();
        return _manifest;
    }
}
