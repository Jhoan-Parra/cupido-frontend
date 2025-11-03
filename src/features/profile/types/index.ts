/**
 * Profile Feature - Type Definitions
 * 
 * Contains all TypeScript interfaces and types for the Profile feature
 */

// Main Profile interface
export interface Profile {
  perfil_id?: number;
  usuario: number | UsuarioObject;
  programa_academico: number | null | ProgramObject;
  ubicacion: number | null | LocationObject;
  hobbies: string[] | null;
  estatura: number | null;
  estado: string;
  fecharegistro?: string;
  likes?: number;
  photos?: string[];
  tagline?: string;
}

// User object interface
export interface UsuarioObject {
  usuario_id: number;
  nombres: string;
  apellidos: string;
  email: string;
  fechanacimiento: string;
  descripcion: string | null;
  genero?: GeneroObject;
}

// Gender interface
export interface GeneroObject {
  genero_id: number;
  descripcion: string;
}

// Location interfaces
export interface Location {
  ubicacion_id: number;
  descripcion: string;
}

export interface LocationObject extends Location {
  fecha_creacion?: string;
}

// Program interfaces
export interface Program {
  programa_id: number;
  descripcion: string;
}

export interface ProgramObject extends Program {
  fecha_creacion?: string;
}

// Form data for editing profile
export interface ProfileFormData {
  programa_academico: number | null;
  ubicacion: number | null;
  hobbies: string[];
  estatura: number | null;
  estado: string;
  tagline?: string;
}

// API response types

export interface GetProfileResponse extends Profile {}

// Reference data types (for dropdowns)
export interface ProgramaAcademicoItem {
  id: number;
  descripcion: string;
}

export interface UbicacionItem {
  id: number;
  descripcion: string;
}
