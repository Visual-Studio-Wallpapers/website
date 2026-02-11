# Generate wallpaper manifest from wwwroot/wallpapers directory
$desktopFiles = Get-ChildItem -Path "wwwroot/wallpapers/desktop/thumbnails" -Filter "*.jpg" | 
    Sort-Object Name -Descending | 
    ForEach-Object { $_.Name }

$phoneFiles = Get-ChildItem -Path "wwwroot/wallpapers/phone/320x568" -Filter "*.jpg" | 
    Sort-Object Name -Descending | 
    ForEach-Object { $_.Name }

$watchFiles = Get-ChildItem -Path "wwwroot/wallpapers/watch/368x448" -Filter "*.jpg" | 
    Sort-Object Name -Descending | 
    ForEach-Object { $_.Name }

$archiveCount = (Get-ChildItem -Path "wwwroot/wallpapers/archive/thumbnail" -Filter "*.jpg").Count

$manifest = @{
    desktop      = $desktopFiles
    phone        = $phoneFiles
    watch        = $watchFiles
    archiveCount = $archiveCount
}

$manifest | ConvertTo-Json -Depth 3 | Set-Content "wwwroot/wallpaper-manifest.json" -Encoding UTF8
Write-Host "Manifest generated: $($desktopFiles.Count) desktop, $($phoneFiles.Count) phone, $($watchFiles.Count) watch, $archiveCount archive"
