import { cn } from "@/lib/utils";
import Image from "next/image";

export default function FeatureCard({
  title,
  description,
  image,
  invert = false,
}: { invert?: boolean; title: string; description: string; image: string }) {
  return (
    <div
      className={cn(
        "h-96 flex w-full px-20 gap-6 bg-secondary rounded-xl place-items-center",
        invert && "flex-row-reverse bg-transparent"
      )}
    >
      <div className="w-3/5 space-y-4 ">
        <h3 className="text-xl sm:text-4xl font-bold">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="w-2/5">
        <Image
          alt="feature image"
          src={image}
          height={362}
          width={362}
          className="m-auto"
        />
      </div>
    </div>
  );
}
