import Background from "@/components/common/background";
import ResponsiveLogo from "@/components/common/responsive-logo";
import { OrganizationSwitcher } from "@/components/dashboard/organization-switcher/organization-switcher";
import { Search } from "@/components/dashboard/search";
import { UserNav } from "@/components/dashboard/user-nav";
import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { auth } from "auth";
import { eq } from "drizzle-orm";
import { ReactNode } from "react";

export default async function layout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const session = await auth();
  const memberOrganizations = await db.query.organizations.findMany({
    where: eq(organizations.admin, session?.user.id ?? ""),
  });
  return (
    <div>
      <Background />
      <div className="hidden flex-col md:flex">
        <div className="mt-4 mb-6">
          <div className="flex h-16 items-center px-8 max-w-screen-2xl m-auto gap-6">
            <ResponsiveLogo />
            <OrganizationSwitcher
              selectedOrganization={undefined}
              memberOrganizations={memberOrganizations}
            />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 pt-6 max-w-screen-2xl m-auto">{children}</div>
    </div>
  );
}
