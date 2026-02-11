using Microsoft.JSInterop;

namespace VisualStudioWallpapers.Services;

public class ThemeService
{
    private readonly IJSRuntime _jsRuntime;
    private string _currentTheme = "vs_purple";

    public string CurrentTheme => _currentTheme;
    public event Action? OnThemeChanged;

    public ThemeService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public async Task InitializeAsync()
    {
        var savedTheme = await _jsRuntime.InvokeAsync<string?>("themeInterop.getTheme");
        _currentTheme = savedTheme ?? "vs_purple";
        await ApplyTheme();
    }

    public async Task ToggleTheme()
    {
        _currentTheme = _currentTheme == "vs_purple" ? "vs_blue" : "vs_purple";
        await ApplyTheme();
        OnThemeChanged?.Invoke();
    }

    private async Task ApplyTheme()
    {
        await _jsRuntime.InvokeVoidAsync("themeInterop.setTheme", _currentTheme);
    }

    public string NextThemeName => _currentTheme == "vs_purple" ? "VS Code Blue" : "VS Purple";
    public bool ShowVsCodeIcon => _currentTheme == "vs_purple";
    public bool ShowVsIcon => _currentTheme == "vs_blue";
}
