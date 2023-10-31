export function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="max-w-7xl mx-auto mt-48 px-4 sm:px-6 lg:px-8 flex flex-col place-items-center"
    >
      {children}
    </div>
  );
}
