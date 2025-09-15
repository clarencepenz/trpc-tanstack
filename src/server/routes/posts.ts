import { supabase } from "@/lib/config/api.config";
import { publicProcedure, router } from "@/server/trpc";
import { PostSchema, UpdatePostSchema } from "@/types/schema/post";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const postRouter = router({
  getPosts: publicProcedure.query(async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Failed to fetch posts",
        cause: error,
      });
    }

    return data;
  }),

  addPost: publicProcedure.input(PostSchema).mutation(async ({ input }) => {
    const { title, body } = input;

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          body,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Unable to insert Post",
        cause: error,
      });
    }

    return data;
  }),

  deletePost: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
          cause: error,
        });
      }

      return data;
    }),

  updatePost: publicProcedure
    .input(UpdatePostSchema)
    .mutation(async ({ input }) => {
      const { id, title, body } = input;

      const { data, error } = await supabase
        .from("posts")
        .update({ title, body })
        .eq("id", id);

      if (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "unable to update Post",
          cause: error,
        });
      }

      return data;
    }),
});
