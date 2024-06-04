import { z } from 'zod';

const productSchema = z.object({
  id: z
    .string()
    .min(3, { message: 'El Id debe tener al menos 3 caracteres' })
    .max(10, { message: 'El Id debe tener como máximo 10 caracteres' }),
  // .refine((id) => !existingIds.includes(id), { message: 'El Id ya existe' }),
  name: z
    .string()
    .min(5, { message: 'El Nombre debe tener al menos 5 caracteres' })
    .max(100, { message: 'El Nombre debe tener como máximo 100 caracteres' }),
  description: z
    .string()
    .min(10, { message: 'La Descripción debe tener al menos 10 caracteres' })
    .max(200, {
      message: 'La Descripción debe tener como máximo 200 caracteres',
    }),
  logo: z.string().nonempty({ message: 'El Logo es requerido' }),
  date_release: z.string().refine((date) => new Date(date) >= new Date(), {
    message: 'La Fecha de Liberación debe ser hoy o en el futuro',
  }),
});

export default productSchema;
