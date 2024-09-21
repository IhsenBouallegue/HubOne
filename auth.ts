import { ORGANIZATION_KEY } from "@/lib/constants";
import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: DrizzleAdapter(db),
  providers: [Google, Github],
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
});

async function createPersonalOrganization(user: User) {
  const newOrganizationId = ORGANIZATION_KEY();
  if (!user.id) {
    throw new Error("User id not found");
  }
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
