import React from 'react';
import { cn } from '../../lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn('block max-w-full h-auto', className)}
        loading="lazy"
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';