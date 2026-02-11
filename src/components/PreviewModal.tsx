import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './PreviewModal.module.css';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  onPrevious: () => void;
  onNext: () => void;
  children?: React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function PreviewModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  onPrevious,
  onNext,
  children,
}: PreviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return [];
    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
  }, []);

  // Focus trap
  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [getFocusableElements],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Tab':
          handleTabKey(e);
          break;
      }
    },
    [onClose, onPrevious, onNext, handleTabKey],
  );

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      // Focus first focusable element after render
      requestAnimationFrame(() => {
        const focusable = getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      });
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);

      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
    };
  }, [isOpen, handleKeyDown, getFocusableElements]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      ref={dialogRef}
    >
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <button
            className={styles.navButton}
            onClick={onPrevious}
            aria-label="Previous image"
          >
            &lt;
          </button>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={styles.previewImage}
          />
          <button
            className={styles.navButton}
            onClick={onNext}
            aria-label="Next image"
          >
            &gt;
          </button>
        </div>
        <div className={styles.sidebar}>
          <h2 id="preview-modal-title" className={styles.title}>
            {imageAlt}
          </h2>
          {children}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close preview"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
