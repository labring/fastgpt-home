"use client";

import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import { withBasePath } from "@/customers/lib/base-path";

const DEFAULT_CUSTOMER_COVER_SRC = "/fastgpt.svg";

function normalizeImageUrl(value?: string | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function getCustomerCoverSrc({
  thumbnailUrl,
  imageUrl,
}: {
  thumbnailUrl?: string | null;
  imageUrl?: string | null;
}) {
  return withBasePath(
    normalizeImageUrl(thumbnailUrl) ||
    normalizeImageUrl(imageUrl) ||
    DEFAULT_CUSTOMER_COVER_SRC
  );
}

type CustomerCoverImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  alt: string;
  thumbnailUrl?: string | null;
  imageUrl?: string | null;
};

export default function CustomerCoverImage({
  alt,
  className,
  thumbnailUrl,
  imageUrl,
  ...imgProps
}: CustomerCoverImageProps) {
  return (
    <CustomerCoverImageInner
      key={getCustomerCoverSrc({ thumbnailUrl, imageUrl })}
      alt={alt}
      className={className}
      thumbnailUrl={thumbnailUrl}
      imageUrl={imageUrl}
      {...imgProps}
    />
  );
}

function CustomerCoverImageInner({
  alt,
  className,
  thumbnailUrl,
  imageUrl,
  ...imgProps
}: CustomerCoverImageProps) {
  const initialSrc = getCustomerCoverSrc({ thumbnailUrl, imageUrl });
  const fallbackSrc = withBasePath(DEFAULT_CUSTOMER_COVER_SRC);
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  return (
    // Thumbnails are already generated on S3, so using the raw URL keeps
    // list and detail views on the exact same browser cache key.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...imgProps}
      src={currentSrc}
      alt={alt}
      className={`absolute inset-0 h-full w-full ${className || ""}`.trim()}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
