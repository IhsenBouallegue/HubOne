import HubSpaceAddCard from "@/components/dashboard/hubspace-add-card";
import HubSpaceCard from "@/components/dashboard/hubspace-card";
import db from "@/lib/db";
import { hubSpaces } from "@/lib/schema/app";
import { organizations } from "@/lib/schema/orgaizations";
import { eq } from "drizzle-orm";

const HUBSPACE_LIMIT = 3;

export default async function Page({
  params: { organizationSlug },
}: { params: { organizationSlug: string } }) {
  const organization = await db.query.organizations.findFirst({
    where: eq(organizations.slug, organizationSlug),
  });
  if (!organization) return <div>Nada</div>;
  const ownHubSpaces = await db.query.hubSpaces.findMany({
    where: eq(hubSpaces.ownerId, organization.id),
  });

  return (
    <div className="max-w-screen-2xl m-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">HubSpaces</h2>
        <h3>Create and access all of your HubSpaces.</h3>
      </div>
      <div className="flex gap-6">
        {ownHubSpaces.map((hubSpace) => (
          <HubSpaceCard key={`hubspace_card_${hubSpace.id}`} {...hubSpace} />
        ))}
        {[...Array(HUBSPACE_LIMIT - ownHubSpaces.length).keys()].map(
          (index) => (
            <HubSpaceAddCard
              key={`hubspace_add_card_${index}`}
              organization={organization}
            />
          )
        )}
      </div>
    </div>
  );
}
