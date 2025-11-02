/**
 * Profile Feature - API Endpoints
 * 
 * Todos los endpoints relacionados con el feature Profile
 * Los endpoints usan autenticación JWT (el cliente axios 'api' debe manejar el token)
 */

import api from '@/lib/api';

export const profileAPI = {
  /**
   * GET /api/v1/profile/profileManagement/update/
   * Obtiene el perfil propio del usuario logueado
   * Autenticación: JWT
   */
  getOwnProfile: async () => {
    const response = await api.get('/profile/profileManagement/update/');
    return response.data;
  },

  /**
   * PATCH /api/v1/profile/profileManagement/update/
   * Actualiza parcialmente el perfil propio del usuario logueado
   * Autenticación: JWT
   */
  updateOwnProfile: async (data: {
    programa_academico?: number | null;
    ubicacion?: number | null;
    hobbies?: string[];
    estatura?: number | null;
    estado?: string;
    tagline?: string;
    // agrega otros campos según el modelo backend
  }) => {
    const response = await api.patch('/profile/profileManagement/update/', data);
    return response.data;
  },

  /**
   * GET /api/v1/profile/profileManagement/<int:pk>/
   * Obtiene información de un perfil específico por ID
   * Autenticación: JWT
   */
  getProfileById: async (userId: number) => {
    const response = await api.get(`/profile/profileManagement/${userId}/`);
    return response.data;
  },

  /**
   * PATCH /api/v1/profile/profileManagement/admin/<int:pk>/
   * Permite a un administrador actualizar un perfil específico
   * Autenticación: JWT (admin)
   */
  adminUpdateProfile: async (userId: number, data: {
    programa_academico?: number | null;
    ubicacion?: number | null;
    hobbies?: string[];
    estatura?: number | null;
    estado?: string;
    tagline?: string;
    // agrega otros campos según el modelo backend
  }) => {
    const response = await api.patch(`/profile/profileManagement/admin/${userId}/`, data);
    return response.data;
  },

  /**
   * POST /api/v1/profile/create-profile/
   * Crea un perfil con valores por defecto
   */
  createProfile: async () => {
    const response = await api.post('/profile/create-profile/');
    return response.data;
  },

  /**
   * GET /api/v1/profile/programas_academicos/
   */
  getProgramasAcademicos: async () => {
    const response = await api.get('/profile/programas_academicos/');
    return response.data;
  },

  /**
   * GET /api/v1/profile/ubicaciones/
   */
  getUbicaciones: async () => {
    const response = await api.get('/profile/ubicaciones/');
    return response.data;
  },
};

