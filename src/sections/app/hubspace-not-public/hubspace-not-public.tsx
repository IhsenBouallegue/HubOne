import Image from "next/image";

export function HubSpaceNotPublic() {
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
          HubSpace is not public.
        </h1>
        <p className="text-center">
          You don&apos;t have access to this HubSpace. Please ask the admin for
          permission.
        </p>
      </div>
    </div>
  );
}
