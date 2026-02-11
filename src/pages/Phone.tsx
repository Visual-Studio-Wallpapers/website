import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import DownloadOptions from '../components/DownloadOptions';
import manifest from '../data/wallpaper-manifest.json';
import { sizes } from '../data/sizes';

function Phone() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = manifest.phone.images;
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
        <title>Phone Wallpapers - Visual Studio Wallpapers</title>
      </Helmet>
      <h2>Phone Wallpapers</h2>
      <WallpaperGrid
        images={images}
        thumbnailBasePath={manifest.phone.thumbnailPath}
        onImageClick={(_, index) => setSelectedIndex(index)}
        deviceType="phone"
        altPrefix="Phone wallpaper"
      />
      <PreviewModal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        imageSrc={`${import.meta.env.BASE_URL}wallpapers/phone/430x932/${currentImage}`}
        imageAlt={`Phone wallpaper ${currentImage?.split('.')[0]}`}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <DownloadOptions
          currentImage={currentImage}
          sizes={sizes.phone}
          deviceType="phone"
          basePath="wallpapers/phone"
        />
      </PreviewModal>
    </>
  );
}

export default Phone;
