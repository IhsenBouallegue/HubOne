"use client";

import { deleteOrganization } from "@/components/dashboard/organization-switcher/organization-switcher.action";
import { useDashboardStore } from "@/lib/Store/dashboard";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { toast } from "@/ui/use-toast";

export default function Settings() {
  const selectedOrganizationId = useDashboardStore(
    (state) => state.selectedOrganizationId
  );
  const callAction = async (formData: FormData) => {
    const { ok, error } = await deleteOrganization(formData);
    if (ok) {
      toast({
        title: "Organization deleted",
      });
      useDashboardStore.setState({ selectedOrganizationId: undefined });
    }
    if (error || !ok) {
      toast({
        title: "Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription>Adjust your organization's settings.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {selectedOrganizationId ?? "no org"}
        <form action={callAction}>
          <Button type="submit" variant="destructive">
            Delete
          </Button>
          <input
            type="hidden"
            name="id"
            defaultValue={selectedOrganizationId}
          />
        </form>
      </CardContent>
    </Card>
  );
}
