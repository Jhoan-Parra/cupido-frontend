/**
 * ViewOtherProfilePage
 * Página para ver el perfil de otros usuarios
 * Route: /profile/:userId
 */

import { ViewOtherProfile } from '@/features/profile';
import { useParams, useNavigate } from 'react-router-dom';
import { useOtherProfile } from '@/features/profile';
import { ProfileSkeleton } from '@/features/profile';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ViewOtherProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userIdNumber = userId ? parseInt(userId, 10) : null;

  const { data: profile, isLoading, error } = useOtherProfile(userIdNumber || 0);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-card rounded-lg p-6 w-full max-w-2xl">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-card rounded-lg p-6 w-full max-w-2xl">
          <Alert variant="destructive">
            <AlertDescription>
              {error?.message || 'Perfil no encontrado'}
            </AlertDescription>
          </Alert>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-primary hover:underline"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <ViewOtherProfile
      profile={profile}
      onClose={() => navigate(-1)}
      onLike={() => {
        toast({
          title: 'Like enviado',
          description: 'Has dado like a este perfil',
        });
      }}
      onChat={() => {
        toast({
          title: 'Chat',
          description: 'Redirigiendo al chat...',
        });
        // TODO: Navigate to chat when ready
        // navigate(`/chat/${userId}`);
      }}
    />
  );
};

export default ViewOtherProfilePage;

