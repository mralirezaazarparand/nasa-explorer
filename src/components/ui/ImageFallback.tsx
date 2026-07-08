"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#0B1220"/><circle cx="200" cy="150" r="60" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/><circle cx="200" cy="150" r="2" fill="rgba(255,255,255,0.15)"/><circle cx="160" cy="120" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="230" cy="170" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="180" cy="190" r="0.8" fill="rgba(255,255,255,0.08)"/></svg>`;

function generatePlaceholderDataUri(): string {
  return `data:image/svg+xml;base64,${btoa(PLACEHOLDER_SVG)}`;
}

interface ImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallback?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  unoptimized?: boolean;
  style?: React.CSSProperties;
}

function ImageFallback({
  src,
  alt,
  className,
  containerClassName,
  fallback,
  fill,
  width,
  height,
  priority,
  sizes,
  unoptimized,
  style,
}: ImageFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fallbackSrc = fallback || generatePlaceholderDataUri();

  return (
    <div className={cn(fill ? "absolute inset-0 overflow-hidden bg-[#0B1220]" : "relative overflow-hidden bg-[#0B1220]", containerClassName)}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.03]" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={{
          ...style,
          ...(fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : {}),
        }}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
      />
    </div>
  );
}

function ImageFallbackStatic({ src, alt, className, fallback }: { src: string; alt: string; className?: string; fallback?: string }) {
  const [error, setError] = useState(false);
  const fallbackSrc = fallback || generatePlaceholderDataUri();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export { ImageFallback, ImageFallbackStatic, generatePlaceholderDataUri };
