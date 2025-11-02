/**
 * MyProfile Component
 * Displays current user's own profile in read-only mode
 * Responsive and includes edit button
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfileHobbies } from './components/ProfileHobbies';
import { ProfileStats } from './components/ProfileStats';
import { ProfileSkeleton } from './components/ProfileSkeleton';
import { useProfile, useCreateProfile } from './hooks/useProfile';

export const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useProfile();
  const createProfile = useCreateProfile();

  // Handle create profile if doesn't exist
  const handleCreateProfile = async () => {
    try {
      await createProfile.mutateAsync();
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

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
          <CardContent className="p-6 text-center">
            <p className="mb-4">No tienes un perfil creado.</p>
            <Button onClick={handleCreateProfile} disabled={createProfile.isPending}>
              {createProfile.isPending ? 'Creando...' : 'Crear Perfil'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show profile in read-only mode
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl sm:text-3xl">Mi Perfil</CardTitle>
            <Button
              onClick={() => navigate('/profile/edit')}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Editar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header */}
          <ProfileHeader profile={profile} />

          {/* Stats */}
          {profile.likes !== undefined && (
            <ProfileStats likes={profile.likes} />
          )}

          {/* Basic Info */}
          <ProfileInfo profile={profile} showHeight={true} />

          {/* Interests */}
          <ProfileHobbies hobbies={profile.hobbies} />

          {/* About me */}
          {typeof profile.usuario === 'object' && profile.usuario.descripcion && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                Sobre mi
              </h2>
              <p className="text-sm sm:text-base leading-relaxed bg-background border rounded-lg p-4">
                {profile.usuario.descripcion}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

