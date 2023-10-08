import { MainNav } from "@/components/dashboard/main-nav";
import { OrganizationSwitcher } from "@/components/dashboard/organization-switcher";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";
import { ReactNode } from "react";

export default function layout({
  children,
}: { children: ReactNode | ReactNode[] }) {
  // const dbUser = await db.query.users.findFirst({
  // where: eq(users.id, user?.id ?? ""),
  // });
  // console.log(dbUser);

  return (
    <div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-8">
            <OrganizationSwitcher />
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
