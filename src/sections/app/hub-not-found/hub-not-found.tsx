import Image from "next/image";

export function HubNotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          src="/logo/hubone_logo.svg"
          width={126}
          height={126}
          alt="logo"
        />
        <h1 className="text-3xl font-bold text-center">Hub was not found.</h1>
        <p className="text-center">Please make sure you entered a valid Hub.</p>
      </div>
    </div>
  );
}
