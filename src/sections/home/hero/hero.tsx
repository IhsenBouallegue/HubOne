import { Button } from "@/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative isolate px-6 lg:px-8 max-w-screen-xl m-auto">
      <div className="ml-12 max-w-2xl pb-32 py-16 sm:py-24 lg:py-36">
        <div>
          <div className="rounded-full shadow-md bg-primary text-primary-foreground py-1 px-4 my-4 font-medium max-w-fit">
            HubOne is now in open <strong>BETA</strong>. We hope you enjoy it!
            🎉
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            The Central Hub For You And Your Team
          </h1>
          <p className="mt-6 text-lg leading-8 ">
            Tired of keeping track of your most used websites? Tired of not
            finding that one super important link? Create you Hub and sync with
            your team.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button>Get started</Button>
            <Button variant="link">Learn more</Button>
          </div>
        </div>
      </div>
      <Image
        alt="background image"
        src="/hero.png"
        width={512}
        height={512}
        className="absolute inset-x-0 right-0  left-[60%] top-[30%]"
      />
    </div>
  );
}
