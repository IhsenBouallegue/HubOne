import OrganizationCard from "@/components/dashboard/organization-card/organization-card";
import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { auth } from "auth";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await auth();

  const memberOrganizations = await db.query.organizations.findMany({
    where: eq(organizations.admin, session?.user.id ?? ""),
  });
  return (
    <div className="max-w-screen-2xl m-auto space-y-12">
      <h2 className="text-3xl font-bold">Organizations</h2>
      <div className="flex gap-6">
        {memberOrganizations.map((memberOrganization) => (
          <OrganizationCard
            key={`organization_card_${memberOrganization.id}`}
            {...memberOrganization}
          />
        ))}
      </div>
    </div>
  );
}
