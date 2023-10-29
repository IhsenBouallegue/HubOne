import { deleteOrganization } from "@/components/dashboard/organization-switcher/organization-switcher.actions";
import db from "@/lib/db";
import { organizations } from "@/lib/schema/orgaizations";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { eq } from "drizzle-orm";

export default async function Settings({
  selectedOrganizationSlug,
}: { selectedOrganizationSlug: string }) {
  const deleteOrganizationWithSlug = deleteOrganization.bind(
    null,
    selectedOrganizationSlug
  );
  const organization = await db.query.organizations.findFirst({
    where: eq(organizations.slug, selectedOrganizationSlug),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription>Adjust your organization's settings.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {organization?.isPersonalOrganization && (
          <p className="text-sm text-muted">
            Deleting a personal organization is not possible.
          </p>
        )}
        <form>
          <Button
            variant="destructive"
            formAction={deleteOrganizationWithSlug}
            aria-disabled={organization?.isPersonalOrganization}
            disabled={organization?.isPersonalOrganization}
          >
            Delete
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
