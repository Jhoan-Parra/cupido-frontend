/**
 * Profile Feature - Custom Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileAPI } from '../api';
import { authAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { Profile, ProfileFormData, UsuarioObject } from '../types';

/**
 * Hook to get current user's profile
 * Combines profile data with user data from auth endpoint
 */
export const useProfile = () => {
  return useQuery<Profile | null>({
    queryKey: ['profile', 'current'],
    queryFn: async () => {
      try {
        // Get profile data
        const profileData = await profileAPI.getOwnProfile();
        console.log('Profile data from backend:', profileData);
        
        // Always fetch user data to ensure we have complete information
        let userData = null;
        try {
          const userResponse = await authAPI.getUserProfile();
          console.log('User response from backend:', userResponse);
          // The endpoint returns { user: {...}, estado: ..., should_complete_profile: ... }
          userData = userResponse.user || userResponse;
        } catch (userError: any) {
          console.warn('No se pudieron obtener los datos del usuario:', userError);
        }
        
        // If we have user data, combine it with profile data
        if (profileData && userData) {
          // Normalize hobbies: convert string to array if needed
          let normalizedHobbies: string[] | null = null;
          if (profileData.hobbies) {
            if (typeof profileData.hobbies === 'string') {
              // Split by comma and trim each hobby
              normalizedHobbies = profileData.hobbies
                .split(',')
                .map(h => h.trim())
                .filter(h => h.length > 0);
            } else if (Array.isArray(profileData.hobbies)) {
              normalizedHobbies = profileData.hobbies;
            }
          }

          // Combine profile data with user data
          const combinedProfile: Profile = {
            ...profileData,
            hobbies: normalizedHobbies,
            usuario: {
              usuario_id: userData.usuario_id,
              nombres: userData.nombres || '',
              apellidos: userData.apellidos || '',
              email: userData.email,
              fechanacimiento: userData.fechanacimiento ? 
                (typeof userData.fechanacimiento === 'string' 
                  ? userData.fechanacimiento 
                  : new Date(userData.fechanacimiento).toISOString().split('T')[0]
                ) : '',
              descripcion: userData.descripcion || null,
              ...(userData.genero_id && {
                genero: {
                  genero_id: userData.genero_id,
                  descripcion: userData.genero?.descripcion || '',
                }
              }),
            } as UsuarioObject,
          };
          
          console.log('Combined profile:', combinedProfile);
          return combinedProfile;
        }
        
        // Normalize hobbies even if usuario is already an object
        if (profileData && profileData.hobbies && typeof profileData.hobbies === 'string') {
          return {
            ...profileData,
            hobbies: profileData.hobbies
              .split(',')
              .map(h => h.trim())
              .filter(h => h.length > 0)
          };
        }
        
        return profileData;
      } catch (error: any) {
        // Better error handling for different error types
        if (error.response) {
          // Server responded with error status
          if (error.response.status === 404) {
            // Profile doesn't exist - this is okay, return null
            return null;
          }
          if (error.response.status === 401) {
            throw new Error('No estás autenticado. Por favor inicia sesión.');
          }
          throw new Error(error.response.data?.error || error.response.data?.message || 'Error al obtener el perfil');
        }
        if (error.request) {
          // Request made but no response
          throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
        }
        // Something else happened
        throw new Error(error.message || 'Error desconocido al cargar el perfil');
      }
    },
    retry: (failureCount, error: any) => {
      // Don't retry on 404 (profile doesn't exist) or 401 (not authenticated)
      if (error?.response?.status === 404 || error?.response?.status === 401) {
        return false;
      }
      // Retry once for network errors
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to update profile
 * ⚠️ Pendiente: Descomentar profileAPI.updateProfile cuando backend esté listo
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<Profile, Error, ProfileFormData>({
    mutationFn: async (data: ProfileFormData) => {
      return await profileAPI.updateOwnProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: 'Perfil actualizado',
        description: 'Tu perfil ha sido actualizado exitosamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error al actualizar',
        description: error.message || 'No se pudo actualizar el perfil. Intenta nuevamente.',
        variant: 'destructive',
      });
    },
  });
};

