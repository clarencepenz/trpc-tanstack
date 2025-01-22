import { publicProcedure, router } from "@/server/trpc";

export const publicRouter = router({
  getTodos: publicProcedure.query(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");

    return data.json();
  }),
});
