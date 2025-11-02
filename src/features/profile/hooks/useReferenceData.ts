/**
 * Hooks para obtener datos de referencia (Programas Académicos y Ubicaciones)
 */

import { useQuery } from '@tanstack/react-query';
import { profileAPI } from '../api';

// Tipo para items de referencia (Programa Académico y Ubicación)
export interface ReferenceItem {
  id: number;
  descripcion: string;
}

/**
 * Hook para obtener la lista de programas académicos
 */
export const useProgramasAcademicos = () => {
  return useQuery<ReferenceItem[]>({
    queryKey: ['profile', 'programas_academicos'],
    queryFn: async () => {
      const data = await profileAPI.getProgramasAcademicos();
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos (cambian poco)
    retry: 1,
  });
};

/**
 * Hook para obtener la lista de ubicaciones
 */
export const useUbicaciones = () => {
  return useQuery<ReferenceItem[]>({
    queryKey: ['profile', 'ubicaciones'],
    queryFn: async () => {
      const data = await profileAPI.getUbicaciones();
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos (cambian poco)
    retry: 1,
  });
};

