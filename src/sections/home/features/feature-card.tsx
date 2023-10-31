import { cn } from "@/lib/utils";

export default function FeatureCard({ invert = false }: { invert?: boolean }) {
  return (
    <div
      className={cn(
        "h-96 flex w-full px-20 gap-6 bg-secondary rounded-xl place-items-center",
        invert && "flex-row-reverse bg-transparent"
      )}
    >
      <div className="w-3/5 space-y-4 ">
        <h3 className="text-xl sm:text-4xl font-bold">Title</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          nesciunt beatae, perspiciatis, distinctio vel itaque illum ut
          excepturi eius a ad repellendus! Laboriosam quod aliquid atque
          provident ullam inventore vitae.
        </p>
      </div>
      <div className=" w-2/5">Diagram</div>
    </div>
  );
}
