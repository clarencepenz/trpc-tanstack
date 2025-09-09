import { publicProcedure, router } from "@/server/trpc";
import { AddPostSchema, UpdatePostSchema } from "@/types/schema/public";

export const publicRouter = router({
  getPosts: publicProcedure.query(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    return data.json();
  }),

  addPost: publicProcedure.input(AddPostSchema).mutation(async ({ input }) => {
    const { id, title } = input;
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return res.json();
  }),

  updatePost: publicProcedure
    .input(UpdatePostSchema)
    .mutation(async ({ input }) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${input.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ title: input.title }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return res.json();
    }),
});
