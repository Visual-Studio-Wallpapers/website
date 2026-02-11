import { useState, useEffect } from 'react';
import styles from './DownloadOptions.module.css';

interface DownloadOptionsProps {
  currentImage: string;
  sizes: readonly string[];
  deviceType: 'desktop' | 'phone' | 'watch' | 'archive';
  basePath: string;
}

function getStoredOpenInNewWindow(): boolean {
  try {
    const stored = localStorage.getItem('openInNewWindow');
    return stored === null ? true : stored === 'true';
  } catch {
    return true;
  }
}

export default function DownloadOptions({
  currentImage,
  sizes,
  deviceType,
  basePath,
}: DownloadOptionsProps) {
  const [openInNewWindow, setOpenInNewWindow] = useState(getStoredOpenInNewWindow);
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? '');

  useEffect(() => {
    setSelectedSize(sizes[0] ?? '');
  }, [sizes]);

  useEffect(() => {
    try {
      localStorage.setItem('openInNewWindow', String(openInNewWindow));
    } catch {
      // localStorage unavailable
    }
  }, [openInNewWindow]);

  const buildHref = (size?: string) => {
    const base = import.meta.env.BASE_URL;
    if (deviceType === 'archive') {
      return `${base}${basePath}/${currentImage}`;
    }
    return `${base}${basePath}/${size}/${currentImage}`;
  };

  const buildFilename = (size?: string) => {
    const name = currentImage.replace(/\.[^.]+$/, '');
    const ext = currentImage.includes('.') ? currentImage.slice(currentImage.lastIndexOf('.')) : '';
    if (deviceType === 'archive') {
      return `archive_${name}${ext}`;
    }
    return `${deviceType}_${size}_${name}${ext}`;
  };

  const linkProps = (size?: string) => {
    if (openInNewWindow) {
      return { target: '_blank' as const, rel: 'noopener noreferrer' };
    }
    return { download: buildFilename(size) };
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Download Options</h3>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={openInNewWindow}
          onChange={(e) => setOpenInNewWindow(e.target.checked)}
        />
        Open in new window
      </label>

      {deviceType === 'archive' && (
        <div role="group" aria-label="Download options">
          <a
            href={buildHref()}
            className={styles.downloadButton}
            {...linkProps()}
          >
            Download Full Size
          </a>
        </div>
      )}

      {(deviceType === 'desktop' || deviceType === 'watch') && (
        <div role="group" aria-label="Download size options" className={styles.buttonGroup}>
          {sizes.map((size) => (
            <a
              key={size}
              href={buildHref(size)}
              className={styles.downloadButton}
              {...linkProps(size)}
            >
              Download {size}
            </a>
          ))}
        </div>
      )}

      {deviceType === 'phone' && (
        <div role="group" aria-label="Download size options" className={styles.phoneGroup}>
          <label htmlFor="phone-size-select" className={styles.selectLabel}>
            Select size
          </label>
          <select
            id="phone-size-select"
            className={styles.sizeSelect}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <a
            href={buildHref(selectedSize)}
            className={styles.downloadButton}
            aria-label={`Download ${selectedSize} wallpaper`}
            {...linkProps(selectedSize)}
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
