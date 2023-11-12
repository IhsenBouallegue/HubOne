import Members from "./members";
import Settings from "./settings";

export default async function Page({
  params,
}: { params: { organizationSlug: string } }) {
  return (
    <div className="max-w-screen-2xl m-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Organization</h2>
        <h3>Add new members and manage your organization</h3>
      </div>
      <Members selectedOrganizationSlug={params.organizationSlug} />
      <Settings selectedOrganizationSlug={params.organizationSlug} />
    </div>
  );
}
