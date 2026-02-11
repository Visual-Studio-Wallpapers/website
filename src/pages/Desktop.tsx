import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import DownloadOptions from '../components/DownloadOptions';
import manifest from '../data/wallpaper-manifest.json';
import { sizes } from '../data/sizes';

function Desktop() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = manifest.desktop.images;
  const currentImage = selectedIndex !== null ? images[selectedIndex] : '';

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  return (
    <>
      <Helmet>
        <title>Desktop Wallpapers - Visual Studio Wallpapers</title>
      </Helmet>
      <h2>Desktop Wallpapers</h2>
      <WallpaperGrid
        images={images}
        thumbnailBasePath={manifest.desktop.thumbnailPath}
        onImageClick={(_, index) => setSelectedIndex(index)}
        deviceType="desktop"
        altPrefix="Desktop wallpaper"
      />
      <PreviewModal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        imageSrc={`${import.meta.env.BASE_URL}wallpapers/desktop/1920x1080/${currentImage}`}
        imageAlt={`Desktop wallpaper ${currentImage?.split('.')[0]}`}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <DownloadOptions
          currentImage={currentImage}
          sizes={sizes.desktop}
          deviceType="desktop"
          basePath="wallpapers/desktop"
        />
      </PreviewModal>
    </>
  );
}

export default Desktop;
