# Profile Feature

Feature completa para gestión de perfiles de usuario en CUPIDO.

> 📖 **Importante**: Ver [INTEGRATION.md](./INTEGRATION.md) para detalles de integración con backend.

## ✅ Estado Actual

- **Frontend**: ✅ Completamente implementado
- **Backend - GET /profile/get-profile/**: ✅ Implementado
- **Backend - POST /profile/create-profile/**: ✅ Implementado
- **Backend - PATCH /profile/update-profile/**: ⚠️ Pendiente
- **Backend - GET /profile/get-profile/:userId/**: ⚠️ Pendiente

Cuando el backend implemente los endpoints faltantes, solo se necesitan descomentar las líneas marcadas con `// TODO` en el código.

## 📁 Estructura

```
profile/
├── components/          # Componentes reutilizables
│   ├── PhotoCard.tsx
│   ├── PhotoGallery.tsx
│   ├── ProfileHeader.tsx
│   ├── ProfileInfo.tsx
│   ├── ProfileHobbies.tsx
│   ├── ProfileStats.tsx
│   ├── ProfileSkeleton.tsx
│   └── index.ts
├── hooks/              # Custom hooks con React Query
│   ├── useProfile.ts
│   ├── useOtherProfile.ts
│   └── index.ts
├── types/              # TypeScript types
│   └── index.ts
├── utils/              # Utilidades y helpers
│   └── index.ts
├── MyProfile.tsx       # Vista 1: Mi perfil (read-only)
├── EditProfile.tsx     # Vista 2: Editar perfil
├── ViewOtherProfile.tsx # Vista 3: Ver perfil de otros
├── index.ts            # Exports principales
└── README.md
```

## 🎯 Vistas

### 1. MyProfile
Vista de solo lectura del propio perfil con botón para editar.

```tsx
import { MyProfile } from '@/features/profile';

<MyProfile />
```

### 2. EditProfile
Formulario completo para editar información del perfil con validaciones.

```tsx
import { EditProfile } from '@/features/profile';

<EditProfile 
  profile={profile}
  onCancel={() => {}}
  onSuccess={() => {}}
/>
```

### 3. ViewOtherProfile
Vista del perfil de otros usuarios con layout 60-40 (fotos/info).

```tsx
import { ViewOtherProfile } from '@/features/profile';

<ViewOtherProfile
  profile={profile}
  onClose={() => {}}
  onLike={() => {}}
  onChat={() => {}}
/>
```

## 🔧 Hooks

### useProfile
Obtiene el perfil del usuario actual.

```tsx
import { useProfile } from '@/features/profile';

const { data: profile, isLoading, error } = useProfile();
```

### useCreateProfile
Crea un nuevo perfil.

```tsx
import { useCreateProfile } from '@/features/profile';

const createProfile = useCreateProfile();

await createProfile.mutateAsync();
```

### useUpdateProfile
Actualiza el perfil (cuando el endpoint esté listo).

```tsx
import { useUpdateProfile } from '@/features/profile';

const updateProfile = useUpdateProfile();

await updateProfile.mutateAsync(formData);
```

## 📦 Componentes

### PhotoGallery
Galería de fotos superpuestas (3 fotos con efecto de rotación).

```tsx
import { PhotoGallery } from '@/features/profile';

<PhotoGallery photos={['url1', 'url2', 'url3']} />
```

### ProfileHeader
Header con nombre y tagline.

```tsx
import { ProfileHeader } from '@/features/profile';

<ProfileHeader profile={profile} />
```

### ProfileInfo
Información básica: edad, ubicación, estatura.

```tsx
import { ProfileInfo } from '@/features/profile';

<ProfileInfo profile={profile} showHeight={true} />
```

### ProfileHobbies
Lista de hobbies como badges.

```tsx
import { ProfileHobbies } from '@/features/profile';

<ProfileHobbies hobbies={profile.hobbies} />
```

### ProfileStats
Estadísticas (likes, matches, views).

```tsx
import { ProfileStats } from '@/features/profile';

<ProfileStats likes={10} matches={5} />
```

## 🎨 Características

- ✅ **Responsive**: Mobile-first, funciona en todos los dispositivos
- ✅ **TypeScript**: Tipos completos y bien definidos
- ✅ **React Query**: Caché y manejo de estado de servidor
- ✅ **Validaciones**: Zod schemas para formularios
- ✅ **Accesibilidad**: ARIA labels y navegación por teclado
- ✅ **Temas**: Compatible con temas femenino/masculino
- ✅ **Loading States**: Skeletons mientras carga
- ✅ **Error Handling**: Manejo completo de errores

## 📡 API Integration

Los endpoints están definidos en `@/lib/api`:

```tsx
import { profileAPI } from '@/lib/api';

// Obtener perfil
const profile = await profileAPI.getProfile();

// Crear perfil
const result = await profileAPI.createProfile();
```

## 🚀 Uso Completo

```tsx
import { MyProfile, EditProfile, ViewOtherProfile } from '@/features/profile';
import { useProfile } from '@/features/profile';

function ProfilePage() {
  const { data: profile } = useProfile();

  return <MyProfile />;
}
```

## 📝 Notas

- Todos los componentes son responsive
- Los hooks manejan automáticamente el caché
- Las validaciones están centralizadas en `utils/validateProfileData`
- Los tipos están completamente tipados para mejor DX
