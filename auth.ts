import db from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    async jwt({token, user}) {
        console.log(user);
        
       if (user?.id) {
           token.id = user.id
       }
       if (user?.name) {
           token.name = user.name;
       }
       return token
    },
  },
});
