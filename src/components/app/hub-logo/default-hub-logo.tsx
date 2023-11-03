export function DefaultHubLogo({
  hubName = "X",
  ...props
}: {
  hubName: string;
}) {
  return (
    <div
      className="rounded-md from-[#ff008c] to-[#0cd4f7] bg-gradient-to-br text-white p-1 flex justify-center items-center"
      style={{
        msUserSelect: "none",
        userSelect: "none",
        aspectRatio: "1/1",
      }}
      {...props}
    >
      <p className="font-bold">{shorten(hubName)}</p>
    </div>
  );
}

const shorten = (name: string) => {
  // name has only lower case
  if (name === name.toLowerCase()) return name[0].toUpperCase();
  // get upper case letters
  return name?.replace(/[^A-Z]+/g, "");
};
