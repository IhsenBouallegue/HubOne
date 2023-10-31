"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import Link from "next/link";

export function Mission() {
  return (
    <div className="h-[30vh] w-full shadow-xl bg-primary relative place-content-center place-items-center gap-4 flex-col flex">
      <p className="text-white text-xl">You like it so far?</p>
      <h2 className="text-white text-6xl font-bold">Join for free!</h2>
      <Link
        href="/sign-in"
        className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}
      >
        Sign up
      </Link>
    </div>
  );
}
