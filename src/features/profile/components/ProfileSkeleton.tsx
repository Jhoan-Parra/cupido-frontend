/**
 * ProfileSkeleton Component
 * Loading skeleton for profile views
 */

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 p-4 sm:p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-28" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
};

