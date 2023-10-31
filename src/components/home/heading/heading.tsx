export function Heading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="place-items-center flex flex-col gap-6 mb-20">
      <h2 className="text-xl sm:text-6xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
