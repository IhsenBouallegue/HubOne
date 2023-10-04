export function HeaderBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4 px-6 m-1 shadow-md rounded-lg min-h-16 flex justify-between items-center bg-white z-40">
      {children}
    </div>
  );
}
