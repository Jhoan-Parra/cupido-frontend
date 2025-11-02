/**
 * Hook to get another user's profile
 * ⚠️ Pendiente: Descomentar profileAPI.getOtherProfile cuando backend esté listo
 * Ver INTEGRATION.md para más detalles
 */

import { useQuery } from '@tanstack/react-query';
import { profileAPI } from '../api';
import type { Profile } from '../types';

export const useOtherProfile = (userId: number) => {
  return useQuery<Profile>({
    queryKey: ['profile', 'other', userId],
    queryFn: async () => {
      // TODO: Descomentar cuando backend implemente GET /profile/get-profile/:userId/
      // return await profileAPI.getOtherProfile(userId);
      throw new Error('getOtherProfile endpoint not implemented yet. Ver INTEGRATION.md para más detalles.');
    },
    enabled: !!userId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};

