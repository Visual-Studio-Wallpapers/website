import { useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WallpaperGrid from '../components/WallpaperGrid';
import PreviewModal from '../components/PreviewModal';
import DownloadOptions from '../components/DownloadOptions';
import manifest from '../data/wallpaper-manifest.json';
import styles from './Archive.module.css';

const ITEMS_PER_PAGE = 30;
const TOTAL_ITEMS = manifest.archive.totalItems;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

function Archive() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, Math.min(TOTAL_PAGES, Number(searchParams.get('page')) || 1));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const pageImages = useMemo(() => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = Math.min(offset + ITEMS_PER_PAGE, TOTAL_ITEMS);
    return Array.from({ length: end - offset }, (_, i) => {
      const num = offset + i + 1;
      return String(num).padStart(3, '0') + '.jpg';
    });
  }, [currentPage]);

  const globalIndex = selectedIndex !== null
    ? (currentPage - 1) * ITEMS_PER_PAGE + selectedIndex
    : null;

  const currentImage = globalIndex !== null
    ? String(globalIndex + 1).padStart(3, '0') + '.jpg'
    : '';

  const handleImageClick = useCallback((_image: string, index: number) => {
    setSelectedIndex(index);
  }, []);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      const gi = (currentPage - 1) * ITEMS_PER_PAGE + prev;
      if (gi > 0) {
        const newGi = gi - 1;
        const newPage = Math.floor(newGi / ITEMS_PER_PAGE) + 1;
        if (newPage !== currentPage) {
          setSearchParams({ page: String(newPage) }, { replace: true });
          return newGi - (newPage - 1) * ITEMS_PER_PAGE;
        }
        return prev - 1;
      }
      return prev;
    });
  }, [currentPage, setSearchParams]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      const gi = (currentPage - 1) * ITEMS_PER_PAGE + prev;
      if (gi < TOTAL_ITEMS - 1) {
        const newGi = gi + 1;
        const newPage = Math.floor(newGi / ITEMS_PER_PAGE) + 1;
        if (newPage !== currentPage) {
          setSearchParams({ page: String(newPage) }, { replace: true });
          return newGi - (newPage - 1) * ITEMS_PER_PAGE;
        }
        return prev + 1;
      }
      return prev;
    });
  }, [currentPage, setSearchParams]);

  const goToPage = useCallback((page: number) => {
    setSearchParams(page === 1 ? {} : { page: String(page) });
    window.scrollTo(0, 0);
  }, [setSearchParams]);

  return (
    <>
      <Helmet>
        <title>Community Archive - Visual Studio Wallpapers</title>
      </Helmet>

      <div className={styles.disclaimer} role="note">
        <p>
          <strong>Disclaimer:</strong> These wallpapers come from the non-Microsoft affiliated{' '}
          <a
            href="https://www.tumblr.com/vs2010wallpapers-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            VS2010 Wallpapers Blog
          </a>{' '}
          run by Scott Hanselman. This is an archived collection preserved for historical purposes.
        </p>
      </div>

      <WallpaperGrid
        images={pageImages}
        thumbnailBasePath={manifest.archive.thumbnailPath}
        onImageClick={handleImageClick}
        deviceType="archive"
        altPrefix="Archive wallpaper"
      />

      <nav
        className={styles.pagination}
        aria-label="Wallpaper pages"
      >
        <span className={styles.pageInfo} aria-live="polite">
          Page {currentPage} of {TOTAL_PAGES}
        </span>
        <div className={styles.pageButtons} role="group" aria-label="Pagination">
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Go to previous page"
          >
            &laquo; Previous
          </button>
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.pageButton} ${page === currentPage ? styles.current : ''}`}
              onClick={() => goToPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
          <button
            className={styles.pageButton}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= TOTAL_PAGES}
            aria-label="Go to next page"
          >
            Next &raquo;
          </button>
        </div>
      </nav>

      <PreviewModal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        imageSrc={`${import.meta.env.BASE_URL}${manifest.archive.fullPath}/${currentImage}`}
        imageAlt={`Archive wallpaper ${currentImage.split('.')[0]}`}
        onPrevious={handlePrevious}
        onNext={handleNext}
      >
        <DownloadOptions
          currentImage={currentImage}
          sizes={[]}
          deviceType="archive"
          basePath={manifest.archive.fullPath}
        />
      </PreviewModal>
    </>
  );
}

export default Archive;
