import Image from "next/image";

export function HubSpaceNotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/logo/hubone_logo.svg"
          width={126}
          height={126}
          alt="logo"
        />
        <h1 className="text-3xl font-bold text-center">
          Hub Space was not found.
        </h1>
        <p className="text-center">
          Please make sure you entered a valid Hub Space.
        </p>
      </div>
    </div>
  );
}
