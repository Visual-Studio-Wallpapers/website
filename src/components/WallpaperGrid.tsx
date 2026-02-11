import { useCallback } from 'react';
import styles from './WallpaperGrid.module.css';

interface WallpaperGridProps {
  images: string[];
  thumbnailBasePath: string;
  onImageClick: (image: string, index: number) => void;
  deviceType: 'desktop' | 'phone' | 'watch' | 'archive';
  altPrefix?: string;
}

export default function WallpaperGrid({
  images,
  thumbnailBasePath,
  onImageClick,
  deviceType,
  altPrefix = 'Wallpaper',
}: WallpaperGridProps) {
  const handleKeyDown = useCallback(
    (image: string, index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onImageClick(image, index);
      }
    },
    [onImageClick],
  );

  const gridClass = `${styles.grid} ${styles[deviceType]}`;
  const wallpaperName = (image: string) => image.replace(/\.[^.]+$/, '');

  return (
    <div
      className={gridClass}
      role="list"
      aria-label={`${altPrefix} gallery`}
    >
      {images.map((image, index) => (
        <div
          key={image}
          className={styles.card}
          role="listitem"
          tabIndex={0}
          aria-label={`${altPrefix} ${wallpaperName(image)}`}
          onClick={() => onImageClick(image, index)}
          onKeyDown={(e) => handleKeyDown(image, index, e)}
        >
          <div className={styles.imageContainer}>
            <img
              src={`${import.meta.env.BASE_URL}${thumbnailBasePath}/${image}`}
              alt={`${altPrefix} ${wallpaperName(image)}`}
              loading="lazy"
            />
          </div>
          <span className={styles.hint} aria-hidden="true">
            Press Enter or click to preview
          </span>
        </div>
      ))}
    </div>
  );
}
