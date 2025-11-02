/**
 * EditProfile Component
 * Form to edit profile information with validation
 * Responsive and includes React Hook Form + Zod
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useUpdateProfile, useProgramasAcademicos, useUbicaciones } from './hooks';
import type { Profile, ProfileFormData } from './types';
import { validateProfileData } from './utils';

const profileSchema = z.object({
  programa_academico: z.number().nullable(),
  ubicacion: z.number().nullable(),
  estatura: z.number().min(1.0, 'La estatura mínima es 1.0m').max(2.5, 'La estatura máxima es 2.5m').nullable(),
  hobbies: z.array(z.string()).max(10, 'Máximo 10 hobbies'),
  estado: z.string().min(1, 'El estado es requerido'),
  tagline: z.string().max(50, 'El tagline no puede exceder 50 caracteres').optional(),
});

interface EditProfileProps {
  profile: Profile;
  onCancel: () => void;
  onSuccess: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  profile,
  onCancel,
  onSuccess,
}) => {
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();
  
  // Obtener datos para los dropdowns
  const { data: programas, isLoading: loadingProgramas } = useProgramasAcademicos();
  const { data: ubicaciones, isLoading: loadingUbicaciones } = useUbicaciones();

  // Obtener valores iniciales de programa_academico y ubicacion
  const getInitialProgramaId = (): number | null => {
    if (typeof profile.programa_academico === 'number') {
      return profile.programa_academico;
    }
    if (profile.programa_academico && typeof profile.programa_academico === 'object') {
      return profile.programa_academico.programa_id;
    }
    return null;
  };

  const getInitialUbicacionId = (): number | null => {
    if (typeof profile.ubicacion === 'number') {
      return profile.ubicacion;
    }
    if (profile.ubicacion && typeof profile.ubicacion === 'object') {
      return profile.ubicacion.ubicacion_id;
    }
    return null;
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      programa_academico: getInitialProgramaId(),
      ubicacion: getInitialUbicacionId(),
      estatura: profile.estatura ?? null,
      hobbies: profile.hobbies ?? [],
      estado: profile.estado || 'Encupidado',
      tagline: profile.tagline ?? '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // Validate using utility function
    const validation = validateProfileData(data);
    
    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        toast({
          title: 'Error de validación',
          description: error,
          variant: 'destructive',
        });
      });
      return;
    }

    try {
      await updateProfile.mutateAsync(data);
      onSuccess();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  // Handle hobbies input (comma-separated)
  const handleHobbiesChange = (value: string) => {
    const hobbies = value
      .split(',')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
    form.setValue('hobbies', hobbies);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Editar Perfil</CardTitle>
          <CardDescription>
            Actualiza la información de tu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Programa Académico */}
              <FormField
                control={form.control}
                name="programa_academico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Programa Académico</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value === '' ? null : parseInt(value, 10));
                      }}
                      value={field.value?.toString() ?? ''}
                      disabled={loadingProgramas}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingProgramas ? 'Cargando...' : 'Seleccione un programa'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Ninguno</SelectItem>
                        {programas?.map((programa) => (
                          <SelectItem key={programa.id} value={programa.id.toString()}>
                            {programa.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ubicación */}
              <FormField
                control={form.control}
                name="ubicacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value === '' ? null : parseInt(value, 10));
                      }}
                      value={field.value?.toString() ?? ''}
                      disabled={loadingUbicaciones}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingUbicaciones ? 'Cargando...' : 'Seleccione una ubicación'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Ninguna</SelectItem>
                        {ubicaciones?.map((ubicacion) => (
                          <SelectItem key={ubicacion.id} value={ubicacion.id.toString()}>
                            {ubicacion.descripcion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Height */}
              <FormField
                control={form.control}
                name="estatura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estatura (en metros)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="1.0"
                        max="2.5"
                        placeholder="1.75"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === '' ? null : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hobbies */}
              <FormField
                control={form.control}
                name="hobbies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hobbies (separados por comas)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Música, Lectura, Deportes"
                        value={field.value?.join(', ') ?? ''}
                        onChange={(e) => handleHobbiesChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      {field.value?.length ?? 0} / 10 hobbies
                    </p>
                  </FormItem>
                )}
              />

              {/* Tagline */}
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Con hambre"
                        maxLength={50}
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      {(field.value?.length ?? 0)} / 50 caracteres
                    </p>
                  </FormItem>
                )}
              />

              {/* Estado */}
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Encupidado"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={updateProfile.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

