/**
 * Profile Feature - Utility Functions
 */

/**
 * Calculates age from date of birth
 */
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Gets icon for hobby/interests
 */
export const getHobbyIcon = (hobby: string): string => {
  const iconMap: Record<string, string> = {
    'Música': '♫',
    'Videojuegos': '🎮',
    'Lectura': '📚',
    'Deportes': '⚽',
    'Cine': '🎬',
    'Cocina': '👨‍🍳',
    'Viajes': '✈️',
    'Fotografía': '📷',
    'Arte': '🎨',
    'Tecnología': '💻',
    'Baile': '💃',
    'Música': '🎵',
  };
  
  // Normalize hobby name for matching
  const normalizedHobby = hobby.toLowerCase().trim();
  
  // Try exact match first
  for (const [key, icon] of Object.entries(iconMap)) {
    if (key.toLowerCase() === normalizedHobby) {
      return icon;
    }
  }
  
  // Try partial match
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalizedHobby.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedHobby)) {
      return icon;
    }
  }
  
  return '⭐'; // Default icon
};

/**
 * Formats height from meters to display string
 */
export const formatHeight = (estatura: number | null): string => {
  if (!estatura) return 'No especificada';
  
  const cm = Math.round(estatura * 100);
  return `${estatura}m (${cm}cm)`;
};

/**
 * Validates profile data
 */
export const validateProfileData = (data: Partial<Profile>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (data.estatura !== null && data.estatura !== undefined) {
    if (data.estatura < 1.0 || data.estatura > 2.5) {
      errors.push('La estatura debe estar entre 1.0m y 2.5m');
    }
  }
  
  if (data.hobbies && data.hobbies.length > 10) {
    errors.push('Máximo 10 hobbies permitidos');
  }
  
  if (data.tagline && data.tagline.length > 50) {
    errors.push('El tagline no puede exceder 50 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

