import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  create_credentials: procedure
    .input(
      z.object({
        accessKey: z.string(),
        secretAccessKey: z.string(),
      })
    )
    .mutation(({ input }) => {
      

      return {
        greeting: `hello ${input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
