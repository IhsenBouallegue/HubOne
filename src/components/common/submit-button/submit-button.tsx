import { Icons } from "@/components/icons";
import { Button } from "@/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text = "Create" }: { text?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}
