/**
 * Profile Feature - Main Exports
 */

// Views
export { MyProfile } from './MyProfile';
export { EditProfile } from './EditProfile';
export { ViewOtherProfile } from './ViewOtherProfile';

// Types
export type {
  Profile,
  UsuarioObject,
  Location,
  LocationObject,
  Program,
  ProgramObject,
  GeneroObject,
  ProfileFormData,
  CreateProfileResponse,
  GetProfileResponse,
} from './types';

// Hooks
export { 
  useProfile, 
  useCreateProfile, 
  useUpdateProfile, 
  useOtherProfile,
  useProgramasAcademicos,
  useUbicaciones,
  type ReferenceItem,
} from './hooks';

// Components
export {
  PhotoCard,
  PhotoGallery,
  ProfileHeader,
  ProfileInfo,
  ProfileHobbies,
  ProfileStats,
  ProfileSkeleton,
} from './components';

// Utils
export { calculateAge, getHobbyIcon, formatHeight, validateProfileData } from './utils';
