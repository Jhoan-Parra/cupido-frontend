/**
 * Profile Feature - API Endpoints
 * 
 * Todos los endpoints relacionados con el feature Profile
 */

import api from '@/lib/api';

/**
 * Profile API endpoints
 * Todos los endpoints del feature Profile
 */
export const profileAPI = {
  /**
   * GET /api/v1/profile/get-profile/
   * Obtiene el perfil del usuario autenticado
   * ✅ Implementado en backend
   */
  getProfile: async () => {
    const response = await api.get('/profile/get-profile/');
    return response.data;
  },

  /**
   * POST /api/v1/profile/create-profile/
   * Crea un perfil con valores por defecto
   * ✅ Implementado en backend
   */
  createProfile: async () => {
    const response = await api.post('/profile/create-profile/');
    return response.data;
  },

  /**
   * PATCH /api/v1/profile/update-profile/
   * Actualiza el perfil del usuario
   * ⚠️ Pendiente implementación en backend
   * TODO: Descomentar cuando el endpoint esté listo
   */
  // updateProfile: async (data: {
  //   programa_academico?: number | null;
  //   ubicacion?: number | null;
  //   hobbies?: string[];
  //   estatura?: number | null;
  //   estado?: string;
  //   tagline?: string;
  // }) => {
  //   const response = await api.patch('/profile/update-profile/', data);
  //   return response.data;
  // },

  /**
   * GET /api/v1/profile/get-profile/:userId/
   * Obtiene el perfil de otro usuario
   * ⚠️ Pendiente implementación en backend
   * TODO: Descomentar cuando el endpoint esté listo
   */
  // getOtherProfile: async (userId: number) => {
  //   const response = await api.get(`/profile/get-profile/${userId}/`);
  //   return response.data;
  // },

  /**
   * GET /api/v1/profile/programas_academicos/
   * Obtiene la lista de programas académicos disponibles para los dropdowns
   * Retorna: [{ id: number, descripcion: string }]
   * ⚠️ Pendiente implementación en backend
   */
  getProgramasAcademicos: async () => {
    const response = await api.get('/profile/programas_academicos/');
    return response.data;
  },

  /**
   * GET /api/v1/profile/ubicaciones/
   * Obtiene la lista de ubicaciones disponibles para los dropdowns
   * Retorna: [{ id: number, descripcion: string }]
   * ⚠️ Pendiente implementación en backend
   */
  getUbicaciones: async () => {
    const response = await api.get('/profile/ubicaciones/');
    return response.data;
  },
};

