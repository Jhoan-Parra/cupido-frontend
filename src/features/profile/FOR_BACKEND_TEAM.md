# 👋 Para el Equipo de Backend

Este documento contiene información técnica específica para integrar el frontend de Profile.

## 🎯 Lo que necesitas saber

### 1. Endpoints ya implementados (Solo verificar que funcionen)
- ✅ `GET /api/v1/profile/get-profile/`
- ✅ `POST /api/v1/profile/create-profile/`

### 2. Endpoints pendientes de implementar
- ⚠️ `PATCH /api/v1/profile/update-profile/`
- ⚠️ `GET /api/v1/profile/get-profile/:userId/`
- ⚠️ `GET /api/v1/profile/programas_academicos/` (para dropdown)
- ⚠️ `GET /api/v1/profile/ubicaciones/` (para dropdown)

### 3. Configuración necesaria
- ✅ CORS: Permitir `http://localhost:8081`
- ✅ JWT: Header `Authorization: Bearer <token>`

## 📋 Formato de Respuesta Esperado

### GET /profile/programas_academicos/ y GET /profile/ubicaciones/

**Estructura requerida** (para dropdowns):
```json
[
  { "id": 1, "descripcion": "Ingeniería de Sistemas" },
  { "id": 2, "descripcion": "Administración" }
]
```

**Importante**:
- Debe devolver un array
- Cada objeto debe tener exactamente `id` (número) y `descripcion` (string)
- El frontend muestra `descripcion` en el dropdown
- Al enviar el formulario, solo envía el `id` seleccionado

### GET /profile/get-profile/ (Respuesta actual está bien)

El frontend acepta **ambos formatos**:

**Formato A (IDs)** - Lo que tienes ahora:
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

**Formato B (Objetos)** - Recomendado para mejor UX:
```json
{
  "usuario": {
    "usuario_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
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
  "estado": "Encupidado",
  "likes": 10
}
```

## 🔧 Cambios mínimos requeridos en backend

### Para PATCH /profile/update-profile/

1. Crear view:
```python
# apps/profile_app/subapps/profile/views/update_profile_view.py
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

class UpdateProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def patch(self, request):
        # Obtener perfil del usuario
        # Actualizar campos
        # Retornar perfil actualizado
        pass
```

2. Agregar URL:
```python
# apps/profile_app/subapps/profile/urls.py
path("update-profile/", UpdateProfileView.as_view(), name="update_profile"),
```

3. **IMPORTANTE - Formato de datos recibidos**:
   - `programa_academico`: El frontend envía **solo el ID** (número) o `null`
   - `ubicacion`: El frontend envía **solo el ID** (número) o `null`
   - Ejemplo de body recibido:
     ```json
     {
       "programa_academico": 1,  // ← Solo número, NO objeto completo
       "ubicacion": 3,            // ← Solo número
       "estatura": 1.75,
       "hobbies": ["Música", "Lectura"],
       "estado": "Encupidado",
       "tagline": "Con hambre"
     }
     ```

4. Validaciones recomendadas:
- `estatura`: 1.0 <= valor <= 2.5
- `hobbies`: máximo 10 elementos
- `tagline`: máximo 50 caracteres
- `programa_academico`: debe existir en la tabla ProgramaAcademico o ser null
- `ubicacion`: debe existir en la tabla Ubicacion o ser null

### Para GET /profile/programas_academicos/ y GET /profile/ubicaciones/

1. Crear ViewSets (ReadOnly):
```python
# apps/auth_app/views.py (o donde estén los modelos)
from rest_framework import viewsets
from .models import ProgramaAcademico, Ubicacion
from .serializers import ProgramaAcademicoSerializer, UbicacionSerializer

class ProgramaAcademicoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProgramaAcademico.objects.all()
    serializer_class = ProgramaAcademicoSerializer

class UbicacionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer
```

2. Crear Serializers:
```python
# serializers.py
class ProgramaAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaAcademico
        fields = ['id', 'descripcion']

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = ['id', 'descripcion']
```

3. Agregar URLs en el router de profile:
```python
# apps/profile_app/subapps/profile/urls.py
router.register('programas_academicos', ProgramaAcademicoViewSet, basename='programas_academicos')
router.register('ubicaciones', UbicacionViewSet, basename='ubicaciones')
```

**Rutas resultantes**:
- `/api/v1/profile/programas_academicos/`
- `/api/v1/profile/ubicaciones/`

**Nota**: Estos endpoints pueden ser públicos (no requieren autenticación) ya que son datos de referencia.

### Para GET /profile/get-profile/:userId/

1. Crear view:
```python
# apps/profile_app/subapps/profile/views/get_other_profile_view.py
class GetOtherProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, userId):
        # Obtener perfil del userId
        # Retornar perfil (sin datos sensibles)
        pass
```

2. Agregar URL:
```python
path("get-profile/<int:userId>/", GetOtherProfileView.as_view(), name="get_other_profile"),
```

## 🧪 Testing Rápido

1. Iniciar backend: `python manage.py runserver`
2. Iniciar frontend: `npm run dev`
3. Autenticarse en frontend
4. Navegar a: `http://localhost:8081/profile`
5. Verificar que funcione

## 📞 Dónde encontrar más info

- **Documentación completa**: [`INTEGRATION_BACKEND.md`](./INTEGRATION_BACKEND.md)
- **Empieza aquí**: [`LEEME_PRIMERO.md`](./LEEME_PRIMERO.md)
- **Documentación técnica**: [`INTEGRATION.md`](./INTEGRATION.md)
- **Código listo para descomentar**: Ver comentarios `// TODO` en:
  - `src/features/profile/api.ts`
  - `src/features/profile/hooks/useProfile.ts`
  - `src/features/profile/hooks/useOtherProfile.ts`

---

**El frontend está 100% listo. Solo necesita que implementes los 2 endpoints faltantes y configures CORS.**

