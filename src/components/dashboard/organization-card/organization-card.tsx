import { Organization } from "@/lib/schema/orgaizations";
import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Link from "next/link";
import { OrganizationAvatar } from "../organization-switcher/organization-avatar";

export default function OrganizationCard(organization: Organization) {
  return (
    <Link href={`/${organization.slug}/dashboard`}>
      <Card className="w-72 h-96 shadow-md flex flex-col overflow-hidden">
        <CardHeader className="bg-slate-600 h-1/2 mb-2 place-content-center place-items-center">
          <OrganizationAvatar organization={organization} />
          <p className="text-xl text-white">{organization.name}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          {organization.isPersonalOrganization && <Badge>Personal</Badge>}
          <div className="flex place-items-center gap-2">
            <div className="h-3 w-3 bg-green-600 rounded-full" />
            <p className="text-sm text-green-600">is active</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
