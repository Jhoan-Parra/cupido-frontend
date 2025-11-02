/**
 * ProfileInfo Component
 * Displays basic profile information: age, location, height
 */

import React from 'react';
import type { Profile } from '../types';
import { calculateAge, formatHeight } from '../utils';

interface ProfileInfoProps {
  profile: Profile;
  className?: string;
  showHeight?: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  profile, 
  className = '',
  showHeight = true,
}) => {
  const usuario = typeof profile.usuario === 'object' ? profile.usuario : null;
  const ubicacion = typeof profile.ubicacion === 'object' ? profile.ubicacion : null;

  if (!usuario) return null;

  const age = usuario.fechanacimiento ? calculateAge(usuario.fechanacimiento) : null;

  return (
    <div className={`space-y-2 ${className}`}>
      {age !== null && (
        <p className="text-base sm:text-lg">
          🎂 {age} años
        </p>
      )}
      {ubicacion && (
        <p className="text-base sm:text-lg">
          📍 {ubicacion.descripcion}
        </p>
      )}
      {showHeight && profile.estatura !== null && (
        <p className="text-base sm:text-lg">
          📏 {formatHeight(profile.estatura)}
        </p>
      )}
    </div>
  );
};

