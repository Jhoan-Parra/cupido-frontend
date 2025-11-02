# 👋 Para el Equipo de Backend - Leer Primero

Este archivo contiene la información esencial que necesitas para integrar el frontend de Profile con el backend.

## 🎯 Lo Básico

**Frontend está 100% listo** ✅  
**Solo necesitas**: Implementar 2 endpoints + Configurar CORS

## 📚 Documentación Completa

Lee estos documentos en orden:

1. **[INTEGRATION_BACKEND.md](./INTEGRATION_BACKEND.md)** ← **EMPIEZA AQUÍ**
   - Guía completa de integración
   - Endpoints, formatos, ejemplos
   - Configuración CORS
   - Checklist completo

2. **[FOR_BACKEND_TEAM.md](./FOR_BACKEND_TEAM.md)**
   - Resumen técnico rápido
   - Cambios mínimos necesarios

3. **[INTEGRATION.md](./INTEGRATION.md)**
   - Documentación técnica detallada

## ✅ Endpoints que ya funcionan

- `GET /api/v1/profile/get-profile/` ✅
- `POST /api/v1/profile/create-profile/` ✅

## ⚠️ Endpoints que faltan

- `PATCH /api/v1/profile/update-profile/` ⚠️
- `GET /api/v1/profile/get-profile/:userId/` ⚠️
- `GET /api/v1/profile/programas_academicos/` ⚠️ (para dropdown de programa académico)
- `GET /api/v1/profile/ubicaciones/` ⚠️ (para dropdown de ubicación)

## 🔧 Configuración Rápida

### CORS (OBLIGATORIO)

```python
# config/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8081",
]
CORS_ALLOW_CREDENTIALS = True
```

### Puertos

- **Frontend**: `http://localhost:8081`
- **Backend**: `http://localhost:8000`

## 🚀 Para Activar Funcionalidades Pendientes

Cuando implementes los endpoints, solo descomenta estas líneas:

1. **`src/features/profile/api.ts`** línea ~58: `updateProfile`
2. **`src/features/profile/api.ts`** línea ~73: `getOtherProfile`
3. **`src/features/profile/hooks/useProfile.ts`** línea ~92
4. **`src/features/profile/hooks/useOtherProfile.ts`** línea ~16

¡Eso es todo! No se necesita ningún otro cambio.

---

**📘 Lee [`INTEGRATION_BACKEND.md`](./INTEGRATION_BACKEND.md) para toda la información detallada.**

