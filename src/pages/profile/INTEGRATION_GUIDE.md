# Guía Rápida de Integración - Profile Pages

## 🎯 Estado de Integración

El frontend está **100% listo** para recibir datos del backend. Solo falta que el backend implemente 2 endpoints adicionales.

## ✅ Lo que ya funciona

1. **Ver mi perfil** (`/profile`)
   - ✅ Conectado a: `GET /api/v1/profile/get-profile/`
   - ✅ Funciona completamente

2. **Crear perfil** 
   - ✅ Conectado a: `POST /api/v1/profile/create-profile/`
   - ✅ Funciona completamente

## ⚠️ Lo que falta en backend

1. **Editar perfil** (`/profile/edit`)
   - ⚠️ Necesita: `PATCH /api/v1/profile/update-profile/`
   - 📝 Código listo, solo descomentar en `src/lib/api.ts`

2. **Ver perfil de otros** (`/profile/:userId`)
   - ⚠️ Necesita: `GET /api/v1/profile/get-profile/:userId/`
   - 📝 Código listo, solo descomentar en `src/lib/api.ts`

## 🔧 Pasos para completar integración

Cuando el backend implemente los endpoints:

1. **Editar `src/lib/api.ts`**:
   - Descomentar `updateProfile` (línea ~206)
   - Descomentar `getOtherProfile` (línea ~224)

2. **Editar `src/features/profile/hooks/useProfile.ts`**:
   - Descomentar la línea en `useUpdateProfile` (línea ~92)

3. **Editar `src/features/profile/hooks/useOtherProfile.ts`**:
   - Descomentar la línea en `useOtherProfile` (línea ~16)

## 📋 Formato de datos esperado

El frontend acepta ambos formatos:

### Opción A: IDs solamente (actual)
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

### Opción B: Objetos anidados (recomendado)
```json
{
  "usuario": {
    "usuario_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    "email": "juan@unipamplona.edu.co",
    "fechanacimiento": "2000-05-15",
    "descripcion": "Estudiante..."
  },
  "programa_academico": {
    "programa_id": 5,
    "descripcion": "Ingeniería de Sistemas"
  },
  "ubicacion": {
    "ubicacion_id": 3,
    "descripcion": "Pamplona"
  },
  "hobbies": ["Música", "Lectura"],
  "estatura": 1.75,
  "estado": "Encupidado"
}
```

## 🧪 Probar integración

1. Backend corriendo en `http://localhost:8000`
2. Frontend corriendo en `http://localhost:8081`
3. Usuario autenticado
4. Navegar a: `http://localhost:8081/profile`

El frontend automáticamente mostrará:
- Tu perfil si existe
- Botón "Crear Perfil" si no existe
- Mensaje de error si hay problema de conexión o auth

---

**Ver [INTEGRATION.md](../features/profile/INTEGRATION.md) para documentación completa**

