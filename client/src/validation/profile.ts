import z from 'zod';
import { FULL_NAME_LENGTH } from '../consts/validation';

export const updateSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
  phoneNumber: z.string().regex(/^\+?(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number'),
});

export type IUpdate = z.infer<typeof updateSchema>;
