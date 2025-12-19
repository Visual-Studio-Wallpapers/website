---
name: image-manipulation
description: "Process and manipulate images using ImageMagick. Supports resizing, format conversion, batch processing, and retrieving image metadata. Use when working with images, creating thumbnails, resizing wallpapers, or performing batch image operations."
compatibility: "Requires ImageMagick installed and available as `magick` (recommended: on PATH). Examples assume Windows + PowerShell."
---

# Image Manipulation with ImageMagick

This skill enables image processing and manipulation tasks using ImageMagick
on Windows systems.

## When to Use This Skill

Use this skill when you need to:

- Resize images (single or batch)
- Get image dimensions and metadata
- Convert between image formats
- Create thumbnails
- Process wallpapers for different screen sizes
- Batch process multiple images with specific criteria

## Prerequisites

- ImageMagick installed on the system
- PowerShell environment (Windows)
- ImageMagick executable available as `magick` (recommended), or at a known path (commonly under `C:\Program Files\ImageMagick-*\magick.exe`).

## Core Capabilities

### 1. Image Information

- Get image dimensions (width x height)
- Retrieve detailed metadata (format, color space, etc.)
- Identify image format

### 2. Image Resizing

- Resize single images
- Batch resize multiple images
- Create thumbnails with specific dimensions
- Maintain aspect ratios

### 3. Batch Processing

- Process images based on dimensions
- Filter and process specific file types
- Apply transformations to multiple files

## Usage Examples

### Example 0: Resolve `magick` executable (recommended)

```powershell
# Prefer ImageMagick on PATH
$magick = (Get-Command magick -ErrorAction SilentlyContinue)?.Source

# Fallback: common install pattern under Program Files
if (-not $magick) {
    $magick = Get-ChildItem "C:\\Program Files\\ImageMagick-*\\magick.exe" -ErrorAction SilentlyContinue |
        Select-Object -First 1 -ExpandProperty FullName
}

if (-not $magick) {
    throw "ImageMagick not found. Install it and/or add 'magick' to PATH."
}
```

### Example 1: Get Image Dimensions

```powershell
# For a single image
& $magick identify -format "%wx%h" path/to/image.jpg

# For multiple images
Get-ChildItem "path/to/images/*" | ForEach-Object { 
    $dimensions = & $magick identify -format "%f: %wx%h`n" $_.FullName
    Write-Host $dimensions 
}
```

### Example 2: Resize Images

```powershell
# Resize a single image
& $magick input.jpg -resize 427x240 output.jpg

# Batch resize images
Get-ChildItem "path/to/images/*" | ForEach-Object { 
    & $magick $_.FullName -resize 427x240 "path/to/output/thumb_$($_.Name)"
}
```

### Example 3: Get Detailed Image Information

```powershell
# Get verbose information about an image
& $magick identify -verbose path/to/image.jpg
```

### Example 4: Process Images Based on Dimensions

```powershell
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

## Guidelines

1. **Always quote file paths** - Use quotes around file paths that might contain spaces
2. **Use the `&` operator** - Invoke the magick executable using `&` in PowerShell
3. **Store the path in a variable** - Assign the ImageMagick path to `$magick` for cleaner code
4. **Wrap in script blocks** - When processing multiple files, use script blocks for better error handling
5. **Verify dimensions first** - Check image dimensions before processing to avoid unnecessary operations
6. **Use appropriate resize flags** - Consider using `!` to force exact dimensions or `^` for minimum dimensions

## Common Patterns

### Pattern: Store ImageMagick Path

```powershell
$magick = (Get-Command magick).Source
```

### Pattern: Get Dimensions as Variables

```powershell
$dimensions = & $magick identify -format "%w,%h" $_.FullName
$width,$height = $dimensions -split ','
```

### Pattern: Conditional Processing

```powershell
if ([int]$width -gt 1920) {
    & $magick $_.FullName -resize 1920x1080 $outputPath
}
```

### Pattern: Create Thumbnails

```powershell
& $magick $_.FullName -resize 427x240 "thumbnails/thumb_$($_.Name)"
```

## Limitations

- Windows-specific paths (adjust for other operating systems)
- Requires ImageMagick to be installed (and ideally available as `magick` on PATH)
- Large batch operations may be memory-intensive
- Some complex operations may require additional ImageMagick delegates
