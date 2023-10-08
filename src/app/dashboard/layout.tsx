import { MainNav } from "@/components/dashboard/main-nav";
import { Search } from "@/components/dashboard/search";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import db from "@/lib/db";
import { users } from "@/lib/schema/auth";
import { auth } from "auth";
import { eq } from "drizzle-orm";
import { ReactNode } from "react";

export default async function layout({
  children,
}: { children: ReactNode | ReactNode[] }) {
  const { user } = await auth();
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user?.id ?? ""),
  });
  console.log(dbUser);

  return (
    <div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-8">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 pt-6">{children}</div>
    </div>
  );
}
