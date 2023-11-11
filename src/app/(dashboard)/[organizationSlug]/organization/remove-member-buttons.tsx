import { Button } from "@/ui/button";
import { auth } from "../../../../../auth";
import { removeMember } from "./member.actions";

export default async function RemoveMemberButton({
  organizationId,
  userId,
}: { organizationId: string; userId: string; disabled?: boolean }) {
  const session = await auth();
  const isDisabled = userId === session?.user.id;
  const removeMemberAction = removeMember.bind(null, organizationId, userId);
  return (
    <form action={removeMemberAction}>
      <Button type="submit" variant="destructive" disabled={isDisabled}>
        Remove
      </Button>
    </form>
  );
}
