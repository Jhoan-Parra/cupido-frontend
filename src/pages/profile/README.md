# Profile Pages

Páginas de perfil organizadas según la estructura solicitada por el equipo de backend.

## Rutas

- `/profile` - MyProfilePage (Ver mi perfil)
- `/profile/edit` - EditProfilePage (Editar mi perfil)
- `/profile/:userId` - ViewOtherProfilePage (Ver perfil de otro usuario)

## Estructura

Las páginas actúan como wrappers que:
1. Manejan la navegación (useNavigate, useParams)
2. Llaman a los hooks de data fetching
3. Renderizan los componentes de `features/profile/`
4. Manejan estados de carga y errores

## Integración con Backend

Las páginas están listas para conectarse con los endpoints:

- `GET /api/v1/profile/get-profile/` → MyProfilePage
- `PATCH /api/v1/profile/update-profile/` → EditProfilePage (cuando esté listo)
- `GET /api/v1/profile/get-profile/:userId/` → ViewOtherProfilePage (cuando esté listo)

## Componentes

Los componentes visuales y lógica están en `features/profile/`:
- `features/profile/MyProfile.tsx` - Componente visual
- `features/profile/EditProfile.tsx` - Formulario de edición
- `features/profile/ViewOtherProfile.tsx` - Componente visual de otros

Las páginas solo orquestan la navegación y el data fetching.

