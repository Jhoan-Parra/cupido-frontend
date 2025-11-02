# Guía de Integración Técnica - Profile Feature

> 📘 **Para el equipo de backend**: Ver [`INTEGRATION_BACKEND.md`](./INTEGRATION_BACKEND.md) para documentación completa, o [`LEEME_PRIMERO.md`](./LEEME_PRIMERO.md) para empezar rápido.

Este documento contiene detalles técnicos sobre la integración del feature Profile.

## 📡 Endpoints Requeridos

### 1. GET `/api/v1/profile/get-profile/`
**Descripción**: Obtiene el perfil del usuario autenticado  
**Auth**: Requerido (Bearer token)  
**Respuesta Exitosa (200)**:
```json
{
  "usuario": 1,
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Fútbol", "Música"],
  "estatura": 1.75,
  "estado": "Encupidado"
}
```
**Respuesta Error (404)**: 
```json
{
  "error": "Perfil no encontrado."
}
```

**✅ Estado**: Implementado en backend

---

### 2. POST `/api/v1/profile/create-profile/`
**Descripción**: Crea un perfil con valores por defecto  
**Auth**: Requerido  
**Body**: `{}` (vacío)  
**Respuesta Exitosa (201)**:
```json
{
  "message": "Perfil creado exitosamente.",
  "perfil_id": 1
}
```

**✅ Estado**: Implementado en backend

---

### 3. PATCH `/api/v1/profile/update-profile/`
**Descripción**: Actualiza el perfil del usuario  
**Auth**: Requerido  
**Body**:
```json
{
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Música", "Lectura"],
  "estatura": 1.75,
  "estado": "Encupidado",
  "tagline": "Con hambre"
}
```
**Respuesta Exitosa (200)**:
```json
{
  "usuario": 1,
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Música", "Lectura"],
  "estatura": 1.75,
  "estado": "Encupidado"
}
```

**⚠️ Estado**: Pendiente implementación en backend

---

### 4. GET `/api/v1/profile/get-profile/:userId/`
**Descripción**: Obtiene el perfil de otro usuario  
**Auth**: Requerido  
**Respuesta Exitosa (200)**:
```json
{
  "usuario": 2,
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Fútbol", "Música"],
  "estatura": 1.75,
  "estado": "Encupidado"
}
```

**⚠️ Estado**: Pendiente implementación en backend

---

## 🔄 Mapeo de Datos

### Respuesta del Backend → Frontend

El frontend espera recibir los datos en este formato:

```typescript
{
  usuario: number | UsuarioObject,  // Puede ser ID o objeto completo
  programa_academico: number | null | ProgramObject,
  ubicacion: number | null | LocationObject,
  hobbies: string[] | null,
  estatura: number | null,
  estado: string,
  likes?: number,
  photos?: string[],
  tagline?: string
}
```

### Opción A: Backend devuelve solo IDs (Actual)
Si el backend devuelve solo IDs, el frontend necesita hacer llamadas adicionales para obtener los datos completos:
- `GET /api/v1/auth/user-get/` para obtener datos del usuario
- `GET /api/v1/auth/programas/` para obtener programas (si existe)
- `GET /api/v1/auth/ubicaciones/` para obtener ubicaciones (si existe)

### Opción B: Backend devuelve objetos anidados (Recomendado)
Si el backend puede modificar el serializer para devolver objetos completos:

```json
{
  "usuario": {
    "usuario_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    "email": "juan@unipamplona.edu.co",
    "fechanacimiento": "2000-05-15",
    "descripcion": "Estudiante de ingeniería..."
  },
  "programa_academico": {
    "programa_id": 5,
    "descripcion": "Ingeniería de Sistemas"
  },
  "ubicacion": {
    "ubicacion_id": 3,
    "descripcion": "Pamplona"
  },
  "hobbies": ["Fútbol", "Música"],
  "estatura": 1.75,
  "estado": "Encupidado"
}
```

**Ventajas**:
- Menos llamadas al backend
- Mejor rendimiento
- Menor complejidad en el frontend

---

## 🔧 Configuración Necesaria

### 1. Actualizar API Client

Cuando el backend implemente los nuevos endpoints, actualizar `src/lib/api.ts`:

```typescript
export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile/get-profile/');
    return response.data;
  },

  createProfile: async () => {
    const response = await api.post('/profile/create-profile/');
    return response.data;
  },

  // Descomentar cuando esté listo:
  updateProfile: async (data: ProfileFormData) => {
    const response = await api.patch('/profile/update-profile/', data);
    return response.data;
  },

  getOtherProfile: async (userId: number) => {
    const response = await api.get(`/profile/get-profile/${userId}/`);
    return response.data;
  },
};
```

### 2. Actualizar Hook useUpdateProfile

En `src/features/profile/hooks/useProfile.ts`, descomentar la implementación:

```typescript
mutationFn: async (data: ProfileFormData) => {
  return await profileAPI.updateProfile(data);
},
```

### 3. Actualizar Hook useOtherProfile

En `src/features/profile/hooks/useOtherProfile.ts`, descomentar:

```typescript
queryFn: async () => {
  return await profileAPI.getOtherProfile(userId);
},
```

---

## 📋 Checklist de Integración

### Backend debe:
- [x] Implementar `GET /profile/get-profile/` ✅
- [x] Implementar `POST /profile/create-profile/` ✅
- [ ] Implementar `PATCH /profile/update-profile/` ⚠️
- [ ] Implementar `GET /profile/get-profile/:userId/` ⚠️
- [ ] (Opcional) Modificar serializer para devolver objetos anidados
- [ ] Agregar campo `likes` en la respuesta
- [ ] Agregar campo `photos` en la respuesta (cuando esté implementado)

### Frontend ya está listo:
- [x] Tipos TypeScript definidos
- [x] Hooks preparados (solo falta descomentar implementaciones)
- [x] Componentes listos para recibir datos
- [x] Manejo de errores implementado
- [x] Estados de carga implementados
- [x] Rutas configuradas en React Router

---

## 🧪 Testing

Para probar la integración:

1. **Iniciar backend**: `python manage.py runserver` (puerto 8000)
2. **Iniciar frontend**: `npm run dev` (puerto 8081)
3. **Autenticarse** en el frontend
4. **Navegar a**: `http://localhost:8081/profile`

El frontend automáticamente:
- Intentará obtener el perfil del usuario autenticado
- Si no existe (404), mostrará opción para crear
- Si hay error de conexión, mostrará mensaje claro
- Si no está autenticado (401), mostrará mensaje para iniciar sesión

---

## 🎯 Flujo de Integración

```
Usuario inicia sesión
    ↓
Frontend: useProfile() → GET /profile/get-profile/
    ↓
Backend: Devuelve perfil o 404
    ↓
Frontend: 
  - Si perfil existe → Muestra MyProfile con datos
  - Si 404 → Muestra botón "Crear Perfil"
  - Si 401 → Muestra "Iniciar Sesión"
  - Si error de red → Muestra mensaje de conexión
```

---

## 📝 Notas Importantes

1. **Autenticación**: Todos los endpoints requieren Bearer token en header `Authorization`
2. **CORS**: El backend debe permitir requests desde `http://localhost:8081`
3. **Formato de Datos**: El frontend acepta tanto IDs como objetos, pero prefiere objetos anidados
4. **Fotos**: El campo `photos` aún no está implementado, pero el frontend está preparado para recibirlo

---

**Última actualización**: Cuando el backend implemente los endpoints faltantes, solo se necesitan descomentar las líneas marcadas con `// TODO` en el código del frontend.

