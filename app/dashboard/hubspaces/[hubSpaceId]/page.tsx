export default function Page({ params }: { params: { hubSpaceId: string } }) {
  const { hubSpaceId } = params;
  if (!hubSpaceId) return <div>No HubSpaceId</div>;
  return <div>{hubSpaceId}</div>;
}
