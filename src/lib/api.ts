import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
  withCredentials: true, // Enable sending cookies and credentials
});

// Request interceptor to add auth token if available
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

// Response interceptor to handle common errors (e.g., expired access token)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token
        const refreshResponse = await authAPI.refreshToken();
        const newAccessToken = refreshResponse.access;
        const newRefreshToken = refreshResponse.refresh;

        // Store new tokens
        localStorage.setItem('access_token', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken);
        }

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Token refresh failed - clear tokens and logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Import dynamically to avoid circular dependencies
        const { useAppStore } = await import('@/store/appStore');
        useAppStore.getState().logout();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API Endpoints
export const authAPI = {
  register: async (data: {
    email: string;
    contrasena: string;
    recaptcha_token: string;
    tyc: boolean;
  }) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  verifyEmail: async (data: { email: string; code: string }) => {
    const response = await api.post('/auth/verify-email/', {
      email: data.email,
      codigo: data.code,
    });
    return response.data;
  },

  resendCode: async (data: { email: string }) => {
    const response = await api.post('/auth/resend-code/', data);
    return response.data;
  },

  login: async (data: { email: string; contrasena: string; recaptcha_token: string }) => {
    const response = await api.post('/auth/login/', data);
    const { access, refresh } = response.data;

    if (access && refresh) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }

    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await api.post('/auth/logout/', { refresh: refreshToken });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return response.data;
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },

  logoutAll: async () => {
    const response = await api.post('/auth/logout-all/');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return response.data;
  },

  getSession: async () => {
    const response = await api.get('/auth/session/');
    return response.data;
  },

  changePassword: async (data: {
    contrasena_actual: string;
    nueva_contrasena: string;
  }) => {
    const response = await api.post('/auth/password-change/', data);
    return response.data;
  },

  resetPasswordRequest: async (data: { email: string }) => {
    const response = await api.post('/auth/password-reset/', data);
    return response.data;
  },

  resetPasswordConfirm: async (data: {
    email: string;
    token: string;
    nueva_contrasena: string;
  }) => {
    const response = await api.post('/auth/password-reset-confirm/', data);
    return response.data;
  },

  updateProfile: async (data: {
    nombres: string;
    apellidos: string;
    genero_id: number;
    fechanacimiento: string;
    descripcion: string;
  }) => {
    const response = await api.patch('/auth/user-update/', data);
    return response.data;
  },

  deactivateAccount: async () => {
    const response = await api.post('/auth/deactivate/');
    return response.data;
  },

  getUserProfile: async () => {
    const response = await api.get('/auth/user-get/');
    return response.data;
  },
};

// Reference Data API endpoints (Programas Académicos y Ubicaciones)
export const referenceDataAPI = {
  /**
   * GET /api/v1/programas_academicos/
   * Obtiene la lista de programas académicos disponibles
   * Retorna: [{ id: number, descripcion: string }]
   */
  getProgramasAcademicos: async () => {
    const response = await api.get('/programas_academicos/');
    return response.data;
  },

  /**
   * GET /api/v1/ubicaciones/
   * Obtiene la lista de ubicaciones disponibles
   * Retorna: [{ id: number, descripcion: string }]
   */
  getUbicaciones: async () => {
    const response = await api.get('/ubicaciones/');
    return response.data;
  },
};

// Profile API endpoints
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
};

export default api;
