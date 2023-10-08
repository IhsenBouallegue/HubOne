import db from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import type { User } from "next-auth";
import Google from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: { ...session.user, id: user.id },
      };
    },
  },
});
