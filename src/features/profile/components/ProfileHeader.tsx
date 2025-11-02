/**
 * ProfileHeader Component
 * Displays profile name and tagline
 */

import React from 'react';
import type { Profile } from '../types';

interface ProfileHeaderProps {
  profile: Profile;
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  className = '' 
}) => {
  const usuario = typeof profile.usuario === 'object' ? profile.usuario : null;
  
  if (!usuario) return null;

  return (
    <div className={className}>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
        {usuario.nombres} {usuario.apellidos}
      </h1>
      {profile.tagline && (
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
          {profile.tagline}
        </p>
      )}
    </div>
  );
};

