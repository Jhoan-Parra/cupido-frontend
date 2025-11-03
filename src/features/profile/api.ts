/**
 * Profile Feature - API Endpoints
 *
 * Todos los endpoints relacionados con el feature Profile
 * Los endpoints usan autenticación JWT (el cliente axios 'api' debe manejar el token)
 */

import axios, { AxiosInstance } from 'axios';

// URL base de la API (usa variable de entorno o localhost por defecto)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Cliente Axios configurado con soporte CORS y autenticación JWT
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🔥 permite enviar cookies o credenciales si el backend lo necesita
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para agregar token JWT automáticamente (si lo tienes guardado en localStorage o similar)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const profileAPI = {
  /**
   * GET /api/v1/profile/profileManagement/update/
   * Obtiene el perfil propio del usuario logueado
   */
  getOwnProfile: async () => {
    const response = await api.get('/profile/profileManagement/update/');
    return response.data;
  },

  /**
   * Alias de getOwnProfile para compatibilidad
   * GET /api/v1/profile/profileManagement/update/
   */
  getProfile: async () => {
    const response = await api.get('/profile/profileManagement/update/');
    return response.data;
  },

  /**
   * PATCH /api/v1/profile/profileManagement/update/
   * Actualiza parcialmente el perfil propio del usuario logueado
   */
  updateOwnProfile: async (data: {
    programa_academico?: number | null;
    ubicacion?: number | null;
    hobbies?: string[];
    estatura?: number | null;
    estado?: string;
    tagline?: string;
  }) => {
    const response = await api.patch('/profile/profileManagement/update/', data);
    return response.data;
  },

  /**
   * GET /api/v1/profile/profileManagement/<int:pk>/
   * Obtiene información de un perfil específico por ID
   */
  getProfileById: async (userId: number) => {
    const response = await api.get(`/profile/profileManagement/${userId}/`);
    return response.data;
  },

  /**
   * PATCH /api/v1/profile/profileManagement/admin/<int:pk>/
   * Permite a un administrador actualizar un perfil específico
   */
  adminUpdateProfile: async (userId: number, data: {
    programa_academico?: number | null;
    ubicacion?: number | null;
    hobbies?: string[];
    estatura?: number | null;
    estado?: string;
    tagline?: string;
  }) => {
    const response = await api.patch(`/profile/profileManagement/admin/${userId}/`, data);
    return response.data;
  },


  /**
   * GET /api/v1/profile/programas_academicos/
   */
  /**
  getProgramasAcademicos: async () => {
    const response = await api.get('/profile/programas_academicos/');
    return response.data;
  },

  /**
   * GET /api/v1/profile/ubicaciones/
   
  getUbicaciones: async () => {
    const response = await api.get('/profile/ubicaciones/');
    return response.data;
  },
  */
};
  
export default profileAPI;
