import { deleteOrganization } from "@/components/dashboard/organization-switcher/organization-switcher.actions";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

export default function Settings({
  selectedOrganizationSlug,
}: { selectedOrganizationSlug: string }) {
  const deleteOrganizationWithSlug = deleteOrganization.bind(
    null,
    selectedOrganizationSlug
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription>Adjust your organization's settings.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form>
          <Button variant="destructive" formAction={deleteOrganizationWithSlug}>
            Delete
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
