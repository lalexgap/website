import { useState, useRef, useEffect } from "react";
import { Box, CardMedia, Skeleton } from "@mui/material";

interface LazyImageProps {
  src: string;
  alt: string;
  /** Max height for the image */
  maxHeight?: { xs?: string; sm?: string; md?: string } | string;
  /** Called when image is successfully loaded */
  onLoad?: () => void;
  /** Whether to enable lazy loading (uses Intersection Observer) */
  lazy?: boolean;
}

/**
 * Optimized image component with lazy loading and skeleton placeholder
 */
export default function LazyImage({
  src,
  alt,
  maxHeight = "60vh",
  onLoad,
  lazy = true,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <Box ref={imgRef} sx={{ position: "relative", width: "100%" }}>
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: 400,
            maxHeight: maxHeight,
          }}
        />
      )}
      {isInView && (
        <CardMedia
          component="img"
          image={src}
          alt={alt}
          onLoad={handleLoad}
          loading="lazy"
          sx={{
            maxHeight: maxHeight,
            objectFit: "contain",
            width: "100%",
            display: isLoaded ? "block" : "none",
          }}
        />
      )}
    </Box>
  );
}
