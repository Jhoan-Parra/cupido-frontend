/**
 * PhotoGallery Component
 * Displays a gallery of 3 overlapping photos with rotation effects
 * Fully responsive: shows single photo on mobile, 3 photos on desktop
 */

import React from 'react';
import { PhotoCard } from './PhotoCard';

interface PhotoGalleryProps {
  photos: string[];
  altPrefix?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos, 
  altPrefix = 'Profile photo' 
}) => {
  // Ensure we have at least 3 photos for the effect
  const displayPhotos = photos.length >= 3 
    ? photos.slice(0, 3) 
    : [
        ...photos,
        ...Array(3 - photos.length).fill('https://via.placeholder.com/465x800'),
      ];

  return (
    <section className="relative w-full h-full flex items-center justify-center perspective overflow-hidden">
      {/* Left card - secondary photo (behind) - Hidden on mobile */}
      <PhotoCard
        image={displayPhotos[0]}
        className="hidden md:absolute z-0 -left-8 xl:-left-16 lg:-left-12 top-8 lg:top-10 w-[30%] md:w-[35%] h-[75%] md:h-[80%] lg:h-[85%] bg-[#ededed]"
        rotation={-15}
        isBlurred
        alt={`${altPrefix} 1`}
      />

      {/* Center card - main photo (front) - Always visible */}
      <PhotoCard
        image={displayPhotos[1] || displayPhotos[0]}
        className="relative z-10 w-[85%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[42%] h-[75%] sm:h-[80%] md:h-[85%] lg:h-[90%] bg-white shadow-xl mx-auto"
        alt={`${altPrefix} 2 (main)`}
      />

      {/* Right card - tertiary photo (behind) - Hidden on mobile */}
      <PhotoCard
        image={displayPhotos[2] || displayPhotos[0]}
        className="hidden md:absolute z-0 -right-8 xl:-right-16 lg:-right-12 top-8 lg:top-10 w-[30%] md:w-[35%] h-[75%] md:h-[80%] lg:h-[85%] bg-[#ededed]"
        rotation={15}
        isBlurred
        alt={`${altPrefix} 3`}
      />
    </section>
  );
};
