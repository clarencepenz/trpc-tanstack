import { z } from 'zod';

export const AddPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
});

export const UpdatePostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
});



export type AddPostSchema = z.infer<typeof AddPostSchema>;
export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;