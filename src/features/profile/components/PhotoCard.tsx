/**
 * PhotoCard Component
 * Displays a single photo card with optional rotation and blur effects
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoCardProps {
  image: string;
  className?: string;
  rotation?: number;
  isBlurred?: boolean;
  alt?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  className,
  rotation = 0,
  isBlurred = false,
  alt = 'Profile photo',
}) => {
  return (
    <Card
      className={cn(
        'rounded-[10px] border-0 shadow-none overflow-hidden',
        'transition-all duration-300',
        isBlurred && 'blur-sm opacity-50',
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <CardContent className="p-0 w-full h-full">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};
