"use client";

import { deleteOrganization } from "@/components/dashboard/organization-switcher/organization-switcher.action";
import { useDashboardStore } from "@/lib/Store/dashboard";
import { Button } from "@/ui/button";
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
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Settings</h3>
      {selectedOrganizationId ?? "no org"}
      <form action={callAction}>
        <Button type="submit" variant="destructive">
          Delete
        </Button>
        <input type="hidden" name="id" defaultValue={selectedOrganizationId} />
      </form>
    </div>
  );
}
