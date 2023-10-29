import db from "@/lib/db";
import { organizations, usersToOrganizations } from "@/lib/schema/orgaizations";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "../../../../../../auth";

export default function Settings({
  selectedOrganizationSlug,
}: { selectedOrganizationSlug: string }) {
  async function callAction() {
    "use server";
    const session = await auth();
    if (!session) return;
    await db
      .delete(organizations)
      .where(
        and(
          eq(organizations.slug, selectedOrganizationSlug),
          eq(organizations.admin, session.user.id)
        )
      )
      .then(
        async () =>
          await db
            .delete(usersToOrganizations)
            .where(
              eq(usersToOrganizations.organizationId, selectedOrganizationSlug)
            )
      );
    redirect("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription>Adjust your organization's settings.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {selectedOrganizationSlug ?? "no org"}
        <form>
          <Button variant="destructive" formAction={callAction}>
            Delete
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
