
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import { publicRouter } from './routes/public';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  profile: profileRouter,
  public: publicRouter,
});

export type AppRouter = typeof appRouter;
