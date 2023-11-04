import Members from "./members";
import Settings from "./settings";

export default async function Page({
  params,
}: { params: { organizationSlug: string } }) {
  return (
    <div className="max-w-screen-2xl m-auto space-y-12">
      <h2 className="text-3xl font-bold">Organization</h2>
      <Members selectedOrganizationSlug={params.organizationSlug} />
      <Settings selectedOrganizationSlug={params.organizationSlug} />
    </div>
  );
}
