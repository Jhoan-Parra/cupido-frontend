/**
 * Profile Feature - Custom Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import type { Profile, ProfileFormData, CreateProfileResponse } from '../types';

/**
 * Hook to get current user's profile
 */
export const useProfile = () => {
  return useQuery<Profile | null>({
    queryKey: ['profile', 'current'],
    queryFn: async () => {
      try {
        const data = await profileAPI.getProfile();
        return data;
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
 * Hook to create a new profile
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation<CreateProfileResponse, Error>({
    mutationFn: async () => {
      return await profileAPI.createProfile();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: 'Perfil creado',
        description: data.message || 'Tu perfil ha sido creado exitosamente.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error al crear perfil',
        description: error.message || 'No se pudo crear el perfil. Intenta nuevamente.',
        variant: 'destructive',
      });
    },
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
      // TODO: Descomentar cuando backend implemente PATCH /profile/update-profile/
      // return await profileAPI.updateProfile(data);
      throw new Error('Update endpoint not implemented yet. Ver INTEGRATION.md para más detalles.');
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

