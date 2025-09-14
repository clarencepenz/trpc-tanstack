import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1, { message: "Title required" }),
  body: z.string().min(1, { message: "Body required" }),
});

export const UpdatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(1, { message: "Title required" }),
  body: z.string().min(1, { message: "Body required" }),
});

export type PostSchema = z.infer<typeof PostSchema>;
export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;
