import OrganizationSwitcher from "@/components/dashboard/organization-switcher";
import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { auth } from "auth";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await auth();

  const memberOrganizations = await db.query.organizations.findMany({
    where: eq(organizations.admin, session?.user.id ?? ""),
  });
  return <OrganizationSwitcher memberOrganizations={memberOrganizations} />;
}
