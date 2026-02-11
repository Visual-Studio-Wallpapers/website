import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import DownloadOptions from '../components/DownloadOptions';
import manifest from '../data/wallpaper-manifest.json';
import { sizes } from '../data/sizes';

function Watch() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = manifest.watch.images;
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
        <title>Watch Wallpapers - Visual Studio Wallpapers</title>
      </Helmet>
      <h2>Watch Wallpapers</h2>
      <WallpaperGrid
        images={images}
        thumbnailBasePath={manifest.watch.thumbnailPath}
        onImageClick={(_, index) => setSelectedIndex(index)}
        deviceType="watch"
        altPrefix="Watch wallpaper"
      />
      <PreviewModal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        imageSrc={`${import.meta.env.BASE_URL}wallpapers/watch/368x448/${currentImage}`}
        imageAlt={`Watch wallpaper ${currentImage?.split('.')[0]}`}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <DownloadOptions
          currentImage={currentImage}
          sizes={sizes.watch}
          deviceType="watch"
          basePath="wallpapers/watch"
        />
      </PreviewModal>
    </>
  );
}

export default Watch;
