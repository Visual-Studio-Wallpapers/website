# ImageMagick Usage Instructions

ImageMagick is installed on this system and can be used for image processing tasks. Here are the key details and examples for using it:

## Installation Location

The ImageMagick executable is located at:
```
C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe
```

## Basic Usage in PowerShell

When using ImageMagick in PowerShell scripts, it's recommended to store the path in a variable:

```powershell
$magick = 'C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe'
```

## Common Commands

### Get Image Dimensions
```powershell
# For a single image
& $magick identify -format "%wx%h" path/to/image.jpg

# For multiple images
Get-ChildItem "path/to/images/*" | ForEach-Object { 
    $dimensions = & $magick identify -format "%f: %wx%h`n" $_.FullName
    Write-Host $dimensions 
}
```

### Resize Images
```powershell
# Resize a single image
& $magick input.jpg -resize 427x240 output.jpg

# Batch resize images
Get-ChildItem "path/to/images/*" | ForEach-Object { 
    & $magick $_.FullName -resize 427x240 "path/to/output/thumb_$($_.Name)"
}
```

### Format Details
To get detailed information about an image (including format, dimensions, color space, etc.):
```powershell
& $magick identify -verbose path/to/image.jpg
```

## Tips
- Always use quotes around file paths that might contain spaces
- Use `&` to invoke the magick executable in PowerShell
- When processing multiple files, wrap the command in a PowerShell script block for better error handling

## Example Script
Here's a complete example that processes images based on their dimensions:

```powershell
$magick = 'C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe'
Get-ChildItem "path/to/images/*" | ForEach-Object { 
    $dimensions = & $magick identify -format "%w,%h" $_.FullName
    if ($dimensions) {
        $width,$height = $dimensions -split ','
        if ([int]$width -eq 2560 -or [int]$height -eq 1440) {
            Write-Host "Processing $($_.Name)"
            & $magick $_.FullName -resize 427x240 "path/to/output/thumb_$($_.Name)"
        }
    }
}
```

Last updated: May 14, 2025
