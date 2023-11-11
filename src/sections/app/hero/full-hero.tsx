import BackgroundImg from "@/components/app/background-img";
import { useHubOneStore } from "@/lib/Store";
import { Hub } from "@/lib/schema/app";
import { useFetchItem } from "@/lib/useQueries";

import { Button } from "@/ui/button";

export function FullHero() {
  const hubId = useHubOneStore((state) => state.hubId);
  const { data: hub } = useFetchItem<Hub>("hubs", hubId!);
  const { name, description, primaryColor, secondaryColor } = hub!;

  const editMode = useHubOneStore((state) => state.editMode);
  const setEditMode = useHubOneStore((state) => state.setEditMode);

  const title = () => (
    <span>
      {" for "}
      <span style={{ color: primaryColor }}>{name}</span>.
    </span>
  );
  return (
    <div className="my-36 relative max-w-screen-lg mx-auto w-full">
      <BackgroundImg
        className="absolute -z-10 w-1/3 max-h-[35vh] sm:right-12 right-[42%]"
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl ">
          The one hub you will ever need
          {name ? title() : "."}
        </h1>
        <p className="mt-3 max-w-lg text-lg text-muted-foreground sm:text-xl sm:mt-5">
          {description}
        </p>

        <div className="mt-10 flex gap-4">
          <Button size="lg">Browse Links</Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "View Mode" : "Edit Mode"}
          </Button>
        </div>
      </div>
    </div>
  );
}
