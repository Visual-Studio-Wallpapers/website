const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'src', 'data', 'wallpaper-manifest.json');

// Check both public/wallpapers/ and wallpapers/ (fallback)
function getWallpaperRoot() {
  const publicPath = path.join(ROOT, 'public', 'wallpapers');
  const rootPath = path.join(ROOT, 'wallpapers');
  if (fs.existsSync(publicPath)) return publicPath;
  if (fs.existsSync(rootPath)) return rootPath;
  return null;
}

// Fallback: use git ls-tree when files aren't on disk
function gitLsTree(treePath) {
  try {
    const output = execSync(
      `git ls-tree HEAD "${treePath}/"`,
      { cwd: ROOT, encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    return output
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const parts = line.split('\t');
        return { name: path.basename(parts[1]), type: line.startsWith('040000') ? 'tree' : 'blob' };
      });
  } catch {
    return [];
  }
}

// Get subdirectory names from filesystem or git
function getSubdirs(dirPath, gitPath) {
  if (dirPath && fs.existsSync(dirPath)) {
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
  }
  return gitLsTree(gitPath)
    .filter(e => e.type === 'tree')
    .map(e => e.name);
}

// Get JPG filenames from filesystem or git
function getJpgFiles(dirPath, gitPath) {
  if (dirPath && fs.existsSync(dirPath)) {
    return fs.readdirSync(dirPath)
      .filter(f => f.toLowerCase().endsWith('.jpg'));
  }
  return gitLsTree(gitPath)
    .filter(e => e.type === 'blob' && e.name.toLowerCase().endsWith('.jpg'))
    .map(e => e.name);
}

function reverseSort(files) {
  return [...files].sort().reverse();
}

function buildManifest() {
  const wpRoot = getWallpaperRoot();

  // Desktop
  const desktopDir = wpRoot ? path.join(wpRoot, 'desktop') : null;
  const desktopThumbDir = wpRoot ? path.join(wpRoot, 'desktop', 'thumbnails') : null;
  const desktopSubdirs = getSubdirs(desktopDir, 'wallpapers/desktop');
  const desktopSizes = desktopSubdirs.filter(d => d !== 'thumbnails').sort();
  const desktopImages = reverseSort(getJpgFiles(desktopThumbDir, 'wallpapers/desktop/thumbnails'));

  // Phone
  const phoneDir = wpRoot ? path.join(wpRoot, 'phone') : null;
  const phoneScanDir = wpRoot ? path.join(wpRoot, 'phone', '320x568') : null;
  const phoneSubdirs = getSubdirs(phoneDir, 'wallpapers/phone');
  const phoneSizes = phoneSubdirs.sort();
  const phoneImages = reverseSort(getJpgFiles(phoneScanDir, 'wallpapers/phone/320x568'));

  // Watch
  const watchDir = wpRoot ? path.join(wpRoot, 'watch') : null;
  const watchScanDir = wpRoot ? path.join(wpRoot, 'watch', '368x448') : null;
  const watchSubdirs = getSubdirs(watchDir, 'wallpapers/watch');
  const watchSizes = watchSubdirs.sort();
  const watchImages = reverseSort(getJpgFiles(watchScanDir, 'wallpapers/watch/368x448'));

  // Archive — count thumbnails only
  const archiveThumbDir = wpRoot ? path.join(wpRoot, 'archive', 'thumbnail') : null;
  const archiveFiles = getJpgFiles(archiveThumbDir, 'wallpapers/archive/thumbnail');
  const totalItems = archiveFiles.length;

  const manifest = {
    desktop: {
      images: desktopImages,
      sizes: desktopSizes,
      thumbnailPath: 'wallpapers/desktop/thumbnails'
    },
    phone: {
      images: phoneImages,
      sizes: phoneSizes,
      thumbnailPath: 'wallpapers/phone/320x568'
    },
    watch: {
      images: watchImages,
      sizes: watchSizes,
      thumbnailPath: 'wallpapers/watch/368x448'
    },
    archive: {
      totalItems,
      thumbnailPath: 'wallpapers/archive/thumbnail',
      fullPath: 'wallpapers/archive'
    }
  };

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Manifest written to ${path.relative(ROOT, OUTPUT)}`);
  console.log(`  Desktop: ${desktopImages.length} images, ${desktopSizes.length} sizes`);
  console.log(`  Phone:   ${phoneImages.length} images, ${phoneSizes.length} sizes`);
  console.log(`  Watch:   ${watchImages.length} images, ${watchSizes.length} sizes`);
  console.log(`  Archive: ${totalItems} items`);
}

buildManifest();
