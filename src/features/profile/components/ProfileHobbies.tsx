/**
 * ProfileHobbies Component
 * Displays hobbies/interests as badges
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getHobbyIcon } from '../utils';

interface ProfileHobbiesProps {
  hobbies: string[] | null;
  className?: string;
}

export const ProfileHobbies: React.FC<ProfileHobbiesProps> = ({ 
  hobbies, 
  className = '' 
}) => {
  if (!hobbies || hobbies.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-xl sm:text-2xl font-semibold mb-3">
        Intereses
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {hobbies.map((hobby, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="text-sm sm:text-base lg:text-lg p-2 bg-transparent hover:bg-transparent border"
          >
            {getHobbyIcon(hobby)} {hobby}
          </Badge>
        ))}
      </div>
    </div>
  );
};

