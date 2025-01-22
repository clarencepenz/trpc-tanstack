import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});


export const CreateAccountSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  contact: z.object({
    phone: z.string().length(10),
    country: z.string(),
  }),
  role: z.enum(["USER", "ADMIN"]), // This can be abstracted
  account: z.enum(["CUSTOMER", "VENDOR"]), // This can be abstracted
});

export type LoginSchema = z.infer<typeof LoginSchema>;
export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;