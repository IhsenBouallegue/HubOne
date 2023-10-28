import { Button } from "@/ui/button";

export default async function Page() {
  return (
    <div className="max-w-screen-2xl m-auto">
      <h2 className="text-3xl font-bold">Organizations</h2>
      <h3 className="text-2xl font-bold">Members</h3>
      <h3 className="text-2xl font-bold">Settings</h3>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
