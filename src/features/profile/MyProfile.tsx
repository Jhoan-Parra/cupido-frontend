/**
 * MyProfile Component
 * Displays current user's own profile matching the mockup design
 * Two-column layout: photos on left, profile info card on right
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PhotoGallery } from './components/PhotoGallery';
import { ProfileSkeleton } from './components/ProfileSkeleton';
import { useProfile } from './hooks/useProfile';
import { calculateAge, formatHeight, getHobbyIcon } from './utils';
import type { Profile } from './types';

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useProfile();
  


  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <ProfileSkeleton />
      </div>
    );
  }

  if (error) {
    // Check error type for better messaging
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Error desconocido';
    
    const isNetworkError = errorMessage.includes('Network') || 
                          errorMessage.includes('Failed to fetch') ||
                          errorMessage.includes('ERR_CONNECTION_REFUSED');
    
    const isAuthError = errorMessage.includes('401') || 
                       errorMessage.includes('Unauthorized');
    
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-destructive">
              Error al cargar el perfil
            </h3>
            
            {isNetworkError && (
              <div className="space-y-2">
                <p className="text-sm">
                  No se pudo conectar con el servidor. Verifica que:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>El servidor backend esté corriendo en <code className="bg-muted px-1 rounded">http://localhost:8000</code></li>
                  <li>Los CORS estén configurados correctamente</li>
                  <li>No haya problemas de firewall o red</li>
                </ul>
              </div>
            )}
            
            {isAuthError && (
              <div className="space-y-2">
                <p className="text-sm">
                  No estás autenticado. Por favor:
                </p>
                <Button onClick={() => navigate('/')} variant="outline">
                  Iniciar Sesión
                </Button>
              </div>
            )}
            
            {!isNetworkError && !isAuthError && (
              <p className="text-sm text-muted-foreground">
                {errorMessage}
              </p>
            )}
            
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="mt-4"
            >
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">Mi Perfil</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              No tienes un perfil creado aún.
            </p>
            <Button
              onClick={() => navigate('/profile/edit')}
              variant="default"
            >
              Crear Perfil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract user data
  const usuario = typeof profile.usuario === 'object' ? profile.usuario : null;
  const ubicacion = typeof profile.ubicacion === 'object' ? profile.ubicacion : null;
  
  if (!usuario) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-4">
            No hay datos de usuario disponibles.
          </p>
        </div>
      </div>
    );
  }

  // Use actual photos if available, otherwise show placeholder message
  const photos = profile.photos && profile.photos.length > 0 
    ? profile.photos 
    : [];

  const age = usuario.fechanacimiento ? calculateAge(usuario.fechanacimiento) : null;

  // Show profile matching mockup design
  return (
    <div className="min-h-screen bg-[#FEF8F6] relative overflow-hidden">
      {/* Decorative floral elements - bottom corners */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-100/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-100/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100/30 to-transparent pointer-events-none" />

      {/* Main container */}
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Top header with breadcrumb and close button */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400 text-sm">Perfil (Personal) Ejemplo</p>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left side - Photo Gallery (60% on desktop) */}
          <div className="w-full lg:w-[60%] h-[400px] lg:h-[600px] relative flex items-center justify-center">
            {photos.length > 0 ? (
              <PhotoGallery photos={photos} altPrefix={`${usuario.nombres} photo`} />
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-lg border border-pink-100 text-center">
                <p className="text-gray-500 text-lg">No hay fotos disponibles</p>
                <p className="text-gray-400 text-sm mt-2">Sube fotos desde el editor de perfil</p>
              </div>
            )}
          </div>

          {/* Right side - Profile Information Card (40% on desktop) */}
          <div className="w-full lg:w-[40%] flex-shrink-0">
            <div className="bg-[#FEF8F6] rounded-2xl p-6 lg:p-8 shadow-lg border border-pink-100">
              {/* Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                {usuario.nombres} {usuario.apellidos}
              </h1>

              {/* Tagline */}
              {profile.tagline && (
                <p className="text-gray-500 text-base lg:text-lg mb-4">
                  ({profile.tagline})
                </p>
              )}

              {/* Basic Info */}
              <div className="space-y-2 mb-6">
                {age !== null && (
                  <p className="text-base lg:text-lg text-gray-700">
                    {age} años
                  </p>
                )}
                {ubicacion && (
                  <p className="text-base lg:text-lg text-gray-700">
                    {ubicacion.descripcion}
                  </p>
                )}
                {profile.estatura !== null && (
                  <p className="text-base lg:text-lg text-gray-700">
                    {formatHeight(profile.estatura)}
                  </p>
                )}
              </div>

              {/* Interests */}
              {profile.hobbies && profile.hobbies.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Intereses</h2>
                  <div className="space-y-2">
                    {profile.hobbies.map((hobby, idx) => (
                      <div key={idx} className="text-base lg:text-lg text-gray-700 flex items-center gap-2">
                        <span>{getHobbyIcon(hobby)}</span>
                        <span>{hobby}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Me */}
              {usuario.descripcion && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Sobre mi</h2>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                    {usuario.descripcion}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="flex-1 bg-[#D9857E] hover:bg-[#C9756E] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Editar Perfil
                </button>
                <button
                  onClick={() => {
                    // TODO: Navigate to preferences when implemented
                    console.log('Navigate to preferences');
                  }}
                  className="flex-1 bg-[#D9857E] hover:bg-[#C9756E] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

