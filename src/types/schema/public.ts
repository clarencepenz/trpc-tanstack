import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type PostSchema = z.infer<typeof PostSchema>;
