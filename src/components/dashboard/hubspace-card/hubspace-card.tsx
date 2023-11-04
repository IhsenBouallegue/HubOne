"use client";

import { HubSpace } from "@/lib/schema/app";
import { Badge } from "@/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import Link from "next/link";
import HubSpaceCardDeleteButton from "./hubspace-card-delete-button";

export default function HubSpaceCard({
  id,
  ownerId,
  domain,
  createdAt,
  isPublic,
}: HubSpace) {
  return (
    <Card className="w-72 h-96 shadow-md flex flex-col overflow-hidden">
      <CardHeader className="bg-slate-600 h-1/2 mb-2 place-content-center place-items-center">
        <p className="text-xl text-white">{domain}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-col gap-2">
          <p>Created on {createdAt?.toDateString()}</p>
          <Link
            href={`https://${domain}.huboneapp.com`}
            style={{ fontSize: 14 }}
          >
            {domain}.huboneapp.com
          </Link>
        </div>
        {isPublic && <Badge>Public</Badge>}
        <div className="flex place-items-center gap-2">
          <div className="h-3 w-3 bg-green-600 rounded-full" />
          <p className="text-sm text-green-600">is active</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end mt-auto">
        <HubSpaceCardDeleteButton id={id} ownerId={ownerId} />
      </CardFooter>
    </Card>
  );
}
