import Members from "./members";
import Settings from "./settings";

export default async function Page({
  params,
}: { params: { organizationId: string } }) {
  return (
    <div className="max-w-screen-2xl m-auto space-y-12">
      <h2 className="text-3xl font-bold">Organizations</h2>
      <Members selectedOrganizationSlug={params.organizationId} />
      <Settings selectedOrganizationSlug={params.organizationId} />
    </div>
  );
}
