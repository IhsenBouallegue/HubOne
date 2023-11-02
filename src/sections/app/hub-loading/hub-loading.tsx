import { Icons } from "@/components/icons";
import React from "react";

export default function HubLoading() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Icons.spinner className="animate-spin h-32 w-32 text-primary" />
        <span className="text-gray-900 font-bold text-xl mt-4">Loading...</span>
      </div>
    </div>
  );
}
