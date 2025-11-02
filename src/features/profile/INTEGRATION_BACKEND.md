# 📘 Guía de Integración Frontend-Backend - Profile Feature

Documentación completa para el equipo de backend sobre cómo integrar el frontend de Profile.

---

## 🎯 Información General

**Frontend desarrollado por**: [BorojoYojan]  
**Fecha**: 2024  
**Stack**: React 18 + TypeScript + Vite + Axios  
**Puerto Frontend**: `http://localhost:8081`  
**Puerto Backend Esperado**: `http://localhost:8000`

---

## ✅ Estado del Frontend

El frontend de Profile está **100% completado** y listo para integrarse. Solo requiere:

1. ✅ Que el backend implemente los endpoints (ver sección Endpoints Requeridos)
2. ✅ Configurar CORS correctamente
3. ✅ Asegurar que las respuestas coincidan con el formato esperado

---

## 🔌 Endpoints Requeridos

### 1. GET `/api/v1/profile/get-profile/` ✅ (Ya implementado según revisión)

**Autenticación**: Requerida (Bearer token)  
**Método**: `GET`  
**Headers**:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Respuesta Exitosa (200)**:
```json
{
  "usuario": 1,
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Fútbol", "Música", "Lectura"],
  "estatura": 1.75,
  "estado": "Encupidado"
}
```

**Respuesta Error (404)** - Cuando el usuario no tiene perfil:
```json
{
  "error": "Perfil no encontrado."
}
```

**Respuesta Error (401)** - No autenticado:
```json
{
  "detail": "Authentication credentials were not provided."
}
```

**⚠️ Nota**: El frontend puede recibir IDs (número) o objetos completos. Ver sección "Formato de Datos" abajo.

---

### 2. POST `/api/v1/profile/create-profile/` ✅ (Ya implementado según revisión)

**Autenticación**: Requerida  
**Método**: `POST`  
**Body**: `{}` (vacío)

**Respuesta Exitosa (201)**:
```json
{
  "message": "Perfil creado exitosamente.",
  "perfil_id": 1
}
```

---

### 3. PATCH `/api/v1/profile/update-profile/` ⚠️ **PENDIENTE IMPLEMENTACIÓN**

**Autenticación**: Requerida  
**Método**: `PATCH`  
**Body**:
```json
{
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Música", "Lectura", "Deportes"],
  "estatura": 1.75,
  "estado": "Encupidado",
  "tagline": "Con hambre"
}
```

**⚠️ IMPORTANTE - Formato de `programa_academico` y `ubicacion`**:
- El frontend **SIEMPRE** envía solo el **ID numérico** (o `null`)
- **NO** envía objetos completos, solo el número del ID seleccionado
- Ejemplo: `"programa_academico": 1` (no `{ id: 1, descripcion: "..." }`)
- Si no hay selección: `"programa_academico": null`

**Respuesta Exitosa (200)**: 
Mismo formato que `GET /profile/get-profile/`

**Validaciones esperadas por frontend**:
- `estatura`: entre 1.0 y 2.5 metros
- `hobbies`: máximo 10 elementos
- `tagline`: máximo 50 caracteres
- `programa_academico`: número o null
- `ubicacion`: número o null

---

### 4. GET `/api/v1/profile/get-profile/:userId/` ⚠️ **PENDIENTE IMPLEMENTACIÓN**

**Autenticación**: Requerida  
**Método**: `GET`  
**Parámetro URL**: `userId` (número)

**Respuesta Exitosa (200)**:
```json
{
  "usuario": 2,
  "programa_academico": 5,
  "ubicacion": 3,
  "hobbies": ["Música", "Videojuegos"],
  "estatura": 1.65,
  "estado": "Encupidado"
}
```

**Respuesta Error (404)**:
```json
{
  "error": "Perfil no encontrado."
}
```

---

## 📋 Endpoints de Datos de Referencia (Para Dropdowns)

El frontend necesita obtener las listas de **Programas Académicos** y **Ubicaciones** para mostrar en los dropdowns del formulario de edición.

### 5. GET `/api/v1/profile/programas_academicos/` ⚠️ **PENDIENTE IMPLEMENTACIÓN**

**Autenticación**: Requerida (o según preferencia del backend)  
**Método**: `GET`

**Respuesta Exitosa (200)**:
```json
[
  { "id": 1, "descripcion": "Ingeniería de Sistemas" },
  { "id": 2, "descripcion": "Administración de Empresas" },
  { "id": 3, "descripcion": "Derecho" }
]
```

**Estructura esperada**:
- Array de objetos
- Cada objeto debe tener:
  - `id`: número (entero)
  - `descripcion`: string

---

### 6. GET `/api/v1/profile/ubicaciones/` ⚠️ **PENDIENTE IMPLEMENTACIÓN**

**Autenticación**: Requerida (o según preferencia del backend)  
**Método**: `GET`

**Respuesta Exitosa (200)**:
```json
[
  { "id": 1, "descripcion": "Pamplona" },
  { "id": 2, "descripcion": "Bucaramanga" },
  { "id": 3, "descripcion": "Cúcuta" }
]
```

**Estructura esperada**:
- Array de objetos
- Cada objeto debe tener:
  - `id`: número (entero)
  - `descripcion`: string

---

## 🔄 Formato de Datos

### Opción A: IDs solamente (Formato actual del backend)

Si el backend devuelve solo IDs (como actualmente):

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

**El frontend hará lo siguiente**:
- Usará `GET /api/v1/auth/user-get/` para obtener datos del usuario
- Mostrará la información disponible

**⚠️ Limitación**: No se mostrarán nombres de programa/ubicación automáticamente.

---

### Opción B: Objetos anidados (Recomendado para mejor UX)

Si el backend puede modificar el serializer para devolver objetos completos:

```json
{
  "usuario": {
    "usuario_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    "email": "juan@unipamplona.edu.co",
    "fechanacimiento": "2000-05-15",
    "descripcion": "Soy estudiante de ingeniería..."
  },
  "programa_academico": {
    "programa_id": 5,
    "descripcion": "Ingeniería de Sistemas"
  },
  "ubicacion": {
    "ubicacion_id": 3,
    "descripcion": "Pamplona"
  },
  "hobbies": ["Música", "Lectura", "Deportes"],
  "estatura": 1.75,
  "estado": "Encupidado",
  "likes": 10,
  "tagline": "Con hambre"
}
```

**Ventajas**:
- ✅ Mejor rendimiento (menos llamadas HTTP)
- ✅ Mejor UX (muestra nombres directamente)
- ✅ El frontend ya está preparado para recibir este formato

**Para implementar esto**, modificar el serializer:

```python
# apps/profile_app/subapps/profile/serializers/get_profile_serializer.py
class GetProfileSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)  # En lugar de solo ID
    programa_academico = ProgramaSerializer(read_only=True)
    ubicacion = UbicacionSerializer(read_only=True)
    
    class Meta:
        model = Perfil
        fields = [
            'usuario',
            'programa_academico',
            'ubicacion',
            'hobbies',
            'estatura',
            'estado',
            'likes',  # Agregar si existe
            'fecharegistro'
        ]
```

---

## 🌐 Configuración CORS

El backend **DEBE** permitir requests desde el frontend:

### Configuración en Django Settings

```python
# config/settings.py

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8081",  # Frontend en desarrollo
    "http://127.0.0.1:8081",
]

CORS_ALLOW_CREDENTIALS = True  # Importante para cookies/tokens
```

### Headers necesarios

El frontend envía estos headers automáticamente:
- `Authorization: Bearer <token>` (si el usuario está autenticado)
- `Content-Type: application/json`

---

## 🔐 Autenticación

El frontend usa **JWT tokens** almacenados en `localStorage`:
- `access_token`: Token de acceso (Bearer)
- `refresh_token`: Token de refresh

**El interceptor de Axios automáticamente**:
- Agrega `Authorization: Bearer <token>` a todas las requests
- Maneja refresh de tokens en caso de 401

**Verificar en backend**:
- Que `JWTAuthentication` esté configurado
- Que acepte el header `Authorization: Bearer <token>`

---

## 🔽 Dropdowns en EditProfile

### Cómo Funcionan los Dropdowns

El formulario de edición (`EditProfile`) usa dropdowns para `programa_academico` y `ubicacion`. El flujo es:

1. **Backend devuelve datos de referencia**:
   ```json
   GET /api/v1/profile/programas_academicos/
   → [{ "id": 1, "descripcion": "Ingeniería de Sistemas" }]
   ```

2. **Frontend muestra descripción en dropdown**:
   - El usuario ve: "Ingeniería de Sistemas"
   - El valor almacenado internamente: `1` (el ID)

3. **Al enviar el formulario, solo se envía el ID**:
   ```json
   PATCH /api/v1/profile/update-profile/
   {
     "programa_academico": 1,  // ← Solo el ID, no el objeto completo
     "ubicacion": 3            // ← Solo el ID
   }
   ```

### Implementación en Backend

**Ejemplo de ViewSet para Programas Académicos**:
```python
# views.py
from rest_framework import viewsets
from .models import ProgramaAcademico
from .serializers import ProgramaAcademicoSerializer

class ProgramaAcademicoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProgramaAcademico.objects.all()
    serializer_class = ProgramaAcademicoSerializer
```

**Ejemplo de Serializer**:
```python
# serializers.py
from rest_framework import serializers
from .models import ProgramaAcademico

class ProgramaAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaAcademico
        fields = ['id', 'descripcion']
```

**Ejemplo de URLs**:
```python
# urls.py
router.register('programas_academicos', ProgramaAcademicoViewSet, basename='programas_academicos')
router.register('ubicaciones', UbicacionViewSet, basename='ubicaciones')
```

### Notas Importantes

- ✅ El frontend **siempre** envía solo el ID numérico en `PATCH /profile/update-profile/`
- ✅ Si el usuario no selecciona nada, se envía `null`
- ✅ Los endpoints de referencia pueden ser públicos (no requieren autenticación)
- ✅ El frontend cachea estos datos por 10 minutos (cambian poco)

---

## 📁 Estructura del Frontend

```
src/
├── pages/profile/              ← Páginas (rutas)
│   ├── MyProfilePage.tsx       → /profile
│   ├── EditProfilePage.tsx    → /profile/edit
│   └── ViewOtherProfilePage.tsx → /profile/:userId
│
└── features/profile/           ← Lógica y componentes
    ├── api.ts                 ← ✅ Endpoints del feature Profile
    ├── MyProfile.tsx           ← Componente visual
    ├── EditProfile.tsx         ← Formulario
    ├── ViewOtherProfile.tsx    ← Vista de otros
    ├── hooks/
    │   ├── useProfile.ts       ← Hook para mi perfil
    │   └── useOtherProfile.ts  ← Hook para otros perfiles
    ├── components/             ← Componentes reutilizables
    └── types/                  ← TypeScript types
```

---

## 🛠️ Código a Descomentar (Cuando endpoints estén listos)

### Paso 1: Descomentar en `src/features/profile/api.ts`

Buscar las líneas marcadas con `// TODO` y descomentar en `src/features/profile/api.ts`:

```typescript
// Línea ~58: updateProfile
updateProfile: async (data: {...}) => {
  const response = await api.patch('/profile/update-profile/', data);
  return response.data;
},

// Línea ~73: getOtherProfile  
getOtherProfile: async (userId: number) => {
  const response = await api.get(`/profile/get-profile/${userId}/`);
  return response.data;
},
```

### Paso 2: Descomentar en `src/features/profile/hooks/useProfile.ts`

Línea ~92:
```typescript
return await profileAPI.updateProfile(data);
```

### Paso 3: Descomentar en `src/features/profile/hooks/useOtherProfile.ts`

Línea ~16:
```typescript
return await profileAPI.getOtherProfile(userId);
```

**¡Eso es todo!** No se necesita ningún otro cambio.

---

## 🧪 Testing de Integración

### 1. Preparación

**Backend**:
```bash
cd cupido-backend
python manage.py runserver  # Puerto 8000
```

**Frontend**:
```bash
cd cupido-frontend
npm run dev  # Puerto 8081
```

### 2. Flujo de Prueba

1. **Abrir**: `http://localhost:8081`
2. **Iniciar sesión** con un usuario de prueba
3. **Navegar a**: `http://localhost:8081/profile`
4. **Verificar**: 
   - Si el usuario tiene perfil → Se muestra
   - Si no tiene perfil → Botón "Crear Perfil"
   - Si hay error de red → Mensaje claro

### 3. Casos de Prueba

#### ✅ Usuario con perfil
- Debe mostrar toda la información
- Botón "Editar" debe funcionar
- Estados de carga deben aparecer brevemente

#### ✅ Usuario sin perfil
- Debe mostrar "No tienes un perfil creado"
- Botón "Crear Perfil" debe funcionar
- Después de crear, debe mostrar el perfil

#### ✅ Error de conexión
- Si backend no está corriendo → Mensaje claro
- Si CORS mal configurado → Error en consola del navegador
- Si no autenticado → Botón para iniciar sesión

---

## 📊 Variables de Entorno

El frontend busca la URL del backend en:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Si no está definida, usa `http://localhost:8000/api/v1` por defecto.

**Para producción**, configurar en `.env`:
```env
VITE_API_BASE_URL=https://api.tudominio.com/api/v1
```

---

## 🔍 Debugging

### Ver requests en consola del navegador

1. Abrir DevTools (F12)
2. Ir a pestaña "Network"
3. Filtrar por "profile"
4. Ver requests/responses

### Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `CORS error` | CORS no configurado | Agregar `http://localhost:8081` a `CORS_ALLOWED_ORIGINS` |
| `401 Unauthorized` | Token inválido/expirado | Verificar JWT config |
| `404 Not Found` | Endpoint no existe | Verificar ruta en backend |
| `Network Error` | Backend no corriendo | Iniciar servidor Django |

---

## 📝 Checklist para Backend

Antes de entregar integración completa, verificar:

- [ ] `GET /api/v1/profile/get-profile/` funciona
- [ ] `POST /api/v1/profile/create-profile/` funciona
- [ ] `PATCH /api/v1/profile/update-profile/` implementado y funciona
- [ ] `GET /api/v1/profile/get-profile/:userId/` implementado y funciona
- [ ] `GET /api/v1/profile/programas_academicos/` implementado y funciona
- [ ] `GET /api/v1/profile/ubicaciones/` implementado y funciona
- [ ] CORS configurado para `http://localhost:8081`
- [ ] JWT Authentication funcionando
- [ ] Respuestas en formato JSON correcto
- [ ] Manejo de errores (404, 401, 400) implementado
- [ ] Campo `likes` incluido en respuesta (si aplica)
- [ ] Validaciones en PATCH endpoint (estatura, hobbies, etc.)
- [ ] Endpoints de referencia (`programas_academicos`, `ubicaciones`) devuelven `{ id, descripcion }`
- [ ] PATCH `update-profile` recibe solo IDs numéricos (no objetos) para `programa_academico` y `ubicacion`

---

## 📞 Contacto

Si hay dudas sobre la integración:
1. Revisar [`INTEGRATION.md`](./INTEGRATION.md) (documentación técnica)
2. Revisar código comentado con `// TODO`
3. Consultar tipos TypeScript en [`types/`](./types/)

---

**Última actualización**: Frontend listo al 100%. Solo requiere descomentar código cuando endpoints estén implementados.

