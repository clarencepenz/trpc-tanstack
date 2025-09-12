import { postRouter } from "./routes/posts";
import { publicRouter } from "./routes/public";
import { router } from "./trpc";

export const appRouter = router({
  public: publicRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
