import { ORGANIZATION_KEY } from "@/lib/constants";
import db from "@/lib/db";
import { users } from "@/lib/schema/auth";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { insertOrganizationSchema } from "@/lib/validations/organization";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const {
  handlers: { GET, POST },
  auth,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google, Github],
  events: {
    async createUser({ user }) {
      await createPersonalOrganization(user);
    },
  },
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      // force log out banned users
      if (!token.email) {
        return {};
      }

      if (user) {
        token.user = user;
      }

      // refresh the user's data if they update their name / email
      if (trigger === "update") {
        const refreshedUser = await db.query.users.findFirst({
          where: eq(users.id, token.sub as string),
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
  },
});

async function createPersonalOrganization(user: User) {
  const newOrganizationId = ORGANIZATION_KEY;
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
