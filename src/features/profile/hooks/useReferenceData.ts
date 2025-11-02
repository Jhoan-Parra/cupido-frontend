/**
 * Hooks para obtener datos de referencia (Programas Académicos y Ubicaciones)
 */

import { useQuery } from '@tanstack/react-query';
import { referenceDataAPI } from '@/lib/api';

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
    queryKey: ['programas_academicos'],
    queryFn: async () => {
      const data = await referenceDataAPI.getProgramasAcademicos();
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
    queryKey: ['ubicaciones'],
    queryFn: async () => {
      const data = await referenceDataAPI.getUbicaciones();
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos (cambian poco)
    retry: 1,
  });
};

