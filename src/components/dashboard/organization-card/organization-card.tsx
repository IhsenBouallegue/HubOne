import { Organization } from "@/lib/schema/orgaizations";
import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader } from "@/ui/card";
import Link from "next/link";

export default function OrganizationCard(organization: Organization) {
  return (
    <Link href={`/${organization.slug}`}>
      <Card className="w-72 h-96 shadow-md flex flex-col overflow-hidden">
        <CardHeader
          className="bg-slate-600 h-1/2 mb-2 place-content-center place-items-center relative shadow-md"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: `url(https://avatar.vercel.sh/${organization.slug}.png)`,
          }}
        >
          {organization.isPersonalOrganization && (
            <Badge className="absolute top-3 right-3 shadow-md">Personal</Badge>
          )}
          <p className="text-2xl text-white font-semibold text-center">
            {organization.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col gap-2 mt-4">
            {/* <p className="text-xs">Created on: {createdAt?.toDateString()}</p> */}
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 bg-green-600 rounded-full" />
              <p className=" text-green-600">is active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
