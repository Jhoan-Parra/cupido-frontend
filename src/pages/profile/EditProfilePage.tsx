/**
 * EditProfilePage
 * Página para editar el perfil propio
 * Route: /profile/edit
 */

import { EditProfile } from '@/features/profile';
import { useProfile } from '@/features/profile';
import { useNavigate } from 'react-router-dom';
import { ProfileSkeleton } from '@/features/profile';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="text-center">
          <p className="mb-4">No tienes un perfil creado.</p>
          <button
            onClick={() => navigate('/profile')}
            className="text-primary hover:underline"
          >
            Volver al perfil
          </button>
        </div>
      </div>
    );
  }

  return (
    <EditProfile
      profile={profile}
      onCancel={() => navigate('/profile')}
      onSuccess={() => navigate('/profile')}
    />
  );
};

export default EditProfilePage;

