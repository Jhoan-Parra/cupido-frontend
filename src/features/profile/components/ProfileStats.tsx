/**
 * ProfileStats Component
 * Displays profile statistics (likes, matches, etc.)
 */

import React from 'react';

interface ProfileStatsProps {
  likes?: number;
  matches?: number;
  views?: number;
  className?: string;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ 
  likes, 
  matches, 
  views,
  className = '' 
}) => {
  const hasStats = likes !== undefined || matches !== undefined || views !== undefined;

  if (!hasStats) return null;

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {likes !== undefined && (
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-primary">{likes}</div>
          <div className="text-sm text-muted-foreground">Likes</div>
        </div>
      )}
      {matches !== undefined && (
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-primary">{matches}</div>
          <div className="text-sm text-muted-foreground">Matches</div>
        </div>
      )}
      {views !== undefined && (
        <div className="text-center p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold text-primary">{views}</div>
          <div className="text-sm text-muted-foreground">Vistas</div>
        </div>
      )}
    </div>
  );
};

