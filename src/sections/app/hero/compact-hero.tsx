import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { useFetchItem } from "@/lib/useQueries";

export function CompactHero() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { hubName, description, primaryColor } = hub!;

  return (
    <div className=" max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl md:text-4xl">
          The one hub for
        </h1>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-6xl">
          <span style={{ color: primaryColor }}>{hubName}</span>.
        </h2>
        <p className="max-w-xl m-auto mt-8 text-lg text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
