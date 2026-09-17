import React, { useState, useEffect } from "react";
import {
  buildResponsiveSrcSet,
  getLqipPlaceholder,
  preloadLcpHeroImage,
  SIZES_PRESETS,
} from "../lib/imageOptimization";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string; // e.g. "16/9", "4/3", "1/1"
  priority?: boolean; // When true, sets loading="eager", fetchpriority="high" and preloads in head for LCP
  sizesPreset?: keyof typeof SIZES_PRESETS;
  customSizes?: string;
  fallbackText?: string;
  containerClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  priority = false,
  sizesPreset = "card",
  customSizes,
  fallbackText,
  className = "",
  containerClassName = "",
  style,
  onLoad,
  onError,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Compute responsive sizes and srcSet
  const effectiveSizes = customSizes || SIZES_PRESETS[sizesPreset] || SIZES_PRESETS.card;
  const responsiveSrcSet = restProps.srcSet || buildResponsiveSrcSet(src);

  // LCP Optimization: Preload priority images into document head
  useEffect(() => {
    if (priority && src) {
      preloadLcpHeroImage(src, responsiveSrcSet, effectiveSizes);
    }
  }, [priority, src, responsiveSrcSet, effectiveSizes]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const placeholderUri = getLqipPlaceholder(
    typeof width === "number" ? width : 600,
    typeof height === "number" ? height : 400
  );

  return (
    <div
      className={`relative overflow-hidden bg-slate-900/80 ${containerClassName}`}
      style={{
        aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
      }}
    >
      {/* Background LQIP Placeholder (Eliminates Cumulative Layout Shift) */}
      {!isLoaded && !hasError && (
        <img
          src={placeholderUri}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 pointer-events-none opacity-60"
        />
      )}

      {/* Main High-Performance Responsive Image */}
      {!hasError ? (
        <img
          src={src}
          srcSet={responsiveSrcSet}
          sizes={effectiveSizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={style}
          {...restProps}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 border border-slate-800 p-4 text-center">
          <span className="text-xs font-mono text-slate-400">
            {fallbackText || alt || "ApexLaunch Verified Asset"}
          </span>
        </div>
      )}
    </div>
  );
};
