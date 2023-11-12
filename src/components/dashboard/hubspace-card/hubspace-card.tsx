"use client";

import { HubSpace } from "@/lib/schema/app";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { buttonVariants } from "@/ui/button";
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
      <CardHeader
        className="bg-slate-600 h-1/2 mb-2 place-content-center place-items-center relative shadow-md"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(https://avatar.vercel.sh/${domain}.png)`,
        }}
      >
        {isPublic && (
          <Badge className="absolute top-3 right-3 shadow-md">Public</Badge>
        )}
        <p className="text-2xl text-white font-semibold">{domain}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-center">
          <Link
            href={
              process.env.NODE_ENV === "production"
                ? `https://${domain}.huboneapp.com`
                : `http://${domain}.localtest.me:3000`
            }
            className={cn(buttonVariants({ variant: "link", size: "sm" }))}
          >
            {domain}
            {process.env.NODE_ENV === "production"
              ? ".huboneapp.con"
              : ".localtest.me:3000"}
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-xs">Created on: {createdAt?.toDateString()}</p>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 bg-green-600 rounded-full" />
            <p className=" text-green-600">is active</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end mt-auto">
        <HubSpaceCardDeleteButton id={id} ownerId={ownerId} />
      </CardFooter>
    </Card>
  );
}
