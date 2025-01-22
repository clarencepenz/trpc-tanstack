import { z } from 'zod';

export const ProfileSchema = z.object({
  username: z.string(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;

