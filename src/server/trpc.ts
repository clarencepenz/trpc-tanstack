import { IContext } from '@/types';
import { initTRPC } from '@trpc/server';

const t = initTRPC.context<IContext>().create();

export const { router } = t;
export const publicProcedure = t.procedure;
