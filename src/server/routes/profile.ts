import { BASE_API_URL } from "@/constants/urls.constant";
import { publicProcedure, router } from "@/server/trpc";
import { ProfileSchema } from "@/types/schema/profile";

export const profileRouter = router({
  getProfile: publicProcedure.query(async () => {
    const data = await fetch(`${BASE_API_URL}/users/profile/me`); // Add bearer token to request headers

    return data.json();
  }),
  getProfileByDisplayName: publicProcedure.input(ProfileSchema).query(async ({ input }) => { // Incase you want to fetch a profile by display name
    const data = await fetch(`${BASE_API_URL}/${input.username}`); //This is wrong API endpoint and it won't work

    const response = await data.json();

    return response;
  }),
});
