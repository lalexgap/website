import { useState, useCallback, useRef, useEffect } from "react";

interface UseCarouselOptions {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  swipeThreshold?: number;
  enableKeyboardNav?: boolean;
}

interface UseCarouselReturn {
  currentIndex: number;
  goTo: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function useCarousel(
  totalItems: number,
  options: UseCarouselOptions = {},
): UseCarouselReturn {
  const {
    autoPlay = false,
    autoPlayInterval = 5000,
    swipeThreshold = 50,
    enableKeyboardNav = true,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  }, [totalItems]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  }, [totalItems]);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalItems) {
        setCurrentIndex(index);
      }
    },
    [totalItems],
  );

  // Handle keyboard events directly from component
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enableKeyboardNav) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
      }
    },
    [goToNext, goToPrevious, enableKeyboardNav],
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay || !autoPlayInterval) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlay, autoPlayInterval]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > swipeThreshold) {
      goToNext();
    } else if (distance < -swipeThreshold) {
      goToPrevious();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [goToNext, goToPrevious, swipeThreshold]);

  return {
    currentIndex,
    goTo,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  };
}
