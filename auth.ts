import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { createId } from "@paralleldrive/cuid2";
import NextAuth from "next-auth";
import type { User } from "next-auth";
import Google from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

const useSecureCookies = !!process.env.VERCEL_URL;

export const {
  handlers: { GET, POST },
  auth,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  events: {
    async createUser({ user }) {
      await createPersonalOrganization(user);
    },
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: { ...session.user, id: user.id },
      };
    },
  },
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        hostOnly: false,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: ".huboneapp.com",
        secure: useSecureCookies,
      },
    },
  },
});

async function createPersonalOrganization(user: User) {
  const newOrganizationId = `org_${createId()}`;
  const organization = insertOrganizationSchema.parse({
    id: newOrganizationId,
    name: "Personal Organization",
    admin: user.id,
    // TODO: should not be user's name but a unique readable slug
    slug: user.name?.trim().toLowerCase().replace(/\s/g, "-"),
    isPersonalOrganization: true,
  });
  await db.insert(organizations).values(organization);
  await db.insert(usersToOrganizations).values({
    userId: user.id,
    organizationId: newOrganizationId,
  });
}
