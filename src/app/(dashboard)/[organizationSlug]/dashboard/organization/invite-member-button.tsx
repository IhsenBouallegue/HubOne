"use client";

import { Button } from "@/ui/button";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { useState } from "react";
import InviteMemberDialog from "./invite-member-dialog";

export default function InviteMemberButton({
  organizationId,
}: { organizationId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Invite Member</Button>
      </DialogTrigger>
      <InviteMemberDialog setOpen={setOpen} organizationId={organizationId} />
    </Dialog>
  );
}
