/**
 * ViewOtherProfile Component
 * Displays another user's profile with photo gallery and information
 * Layout: 60% photos (left), 40% info (right) on desktop
 * Responsive: stacks vertically on mobile
 */

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhotoGallery } from './components/PhotoGallery';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfileHobbies } from './components/ProfileHobbies';
import { ProfileSkeleton } from './components/ProfileSkeleton';
import type { Profile } from './types';

interface ViewOtherProfileProps {
  profile: Profile;
  onClose?: () => void;
  onLike?: () => void;
  onChat?: () => void;
}

export const ViewOtherProfile: React.FC<ViewOtherProfileProps> = ({
  profile,
  onClose,
  onLike,
  onChat,
}) => {
  const usuario = typeof profile.usuario === 'object' ? profile.usuario : null;

  if (!usuario) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-card rounded-lg p-6">
          <p>Error: Perfil no válido</p>
        </div>
      </div>
    );
  }

  const photos = profile.photos || [
    'https://via.placeholder.com/465x800',
    'https://via.placeholder.com/401x700',
    'https://via.placeholder.com/401x700',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-card rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-background/80 hover:bg-background"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* 60% Left: Photo Gallery - Full width on mobile, stacked */}
        <div className="w-full lg:w-[60%] h-[40%] lg:h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
          <PhotoGallery photos={photos} altPrefix={`${usuario.nombres} photo`} />
        </div>

        {/* 40% Right: Profile Information - Full width on mobile */}
        <div className="w-full lg:w-[40%] h-[60%] lg:h-full p-4 sm:p-8 overflow-y-auto">
          <div className="space-y-4 sm:space-y-6">
            {/* Header with name and tagline */}
            <div className="animate-fade-in">
              <ProfileHeader profile={profile} />
            </div>

            {/* Basic info */}
            <div className="animate-fade-in [--animation-delay:200ms]">
              <ProfileInfo profile={profile} showHeight={true} />
            </div>

            {/* Interests */}
            <div className="animate-fade-in [--animation-delay:400ms]">
              <ProfileHobbies hobbies={profile.hobbies} />
            </div>

            {/* About me */}
            {usuario.descripcion && (
              <div className="animate-fade-in [--animation-delay:600ms]">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                  Sobre mi
                </h2>
                <p className="text-sm sm:text-base leading-relaxed bg-background border rounded-lg p-3 sm:p-4">
                  {usuario.descripcion}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 sm:gap-3 pt-4 animate-fade-in [--animation-delay:800ms]">
              <Button
                onClick={onLike}
                className="flex-1"
                size="lg"
              >
                ❤️ Like
              </Button>
              <Button
                onClick={onChat}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                💬 Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
