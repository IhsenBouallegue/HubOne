import Members from "./members";
import Settings from "./settings";

export default async function Page() {
  return (
    <div className="max-w-screen-2xl m-auto space-y-12">
      <h2 className="text-3xl font-bold">Organizations</h2>
      <Members />
      <Settings />
    </div>
  );
}
