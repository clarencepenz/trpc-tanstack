import { publicProcedure, router } from "@/server/trpc";
import { PostSchema } from "@/types/schema/public";

export const publicRouter = router({
  getPosts: publicProcedure.query(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
 
    const response = (await data.json()) as PostSchema[];

    return response;
  }),
});
