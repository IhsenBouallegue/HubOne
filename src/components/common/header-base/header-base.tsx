export function HeaderBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4 px-6 m-1 min-h-16 z-40 relative">
      <div className="max-w-screen-xl flex justify-between items-center m-auto">
        {children}
      </div>
    </div>
  );
}
