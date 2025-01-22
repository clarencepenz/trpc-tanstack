import { BASE_API_URL } from "@/constants/urls.constant";
import { publicProcedure, router } from "@/server/trpc";
import { CreateAccountSchema, LoginSchema } from "@/types/schema/auth";

export const authRouter = router({
  login: publicProcedure.input(LoginSchema).mutation(async ({ input }) => {
    const data = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Inform the server you're sending JSON data
      },
      body: JSON.stringify(input), // Convert your data to JSON format
    });

    return data.json();
  }),
  createAccount: publicProcedure
    .input(CreateAccountSchema)
    .mutation(async ({ input }) => {
      const data = await fetch(`${BASE_API_URL}/auth/sign-up-one`, {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Inform the server you're sending JSON data
        },
        body: JSON.stringify(input), // Convert your data to JSON format
      });

      return data.json();
    }),
});
