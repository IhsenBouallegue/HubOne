export default async function Page() {
  // const { orgId, userId } = auth();
  // if (!userId) return null;
  // const ownHubspaces = await db.query.hubSpaces.findMany({
  //   where: eq(hubSpaces.ownerId, orgId ?? userId),
  // });

  return (
    <div className="max-w-screen-2xl m-auto">
      <h2 className="text-3xl font-bold">HubSpaces</h2>
      <div className="flex gap-6">
        {/* {ownHubspaces.map((hubspace) => (
          <HubSpaceCard key={`hubspace_card_${hubspace.id}`} {...hubspace} />
        ))}
        {[...Array(HUBSPACE_LIMIT - ownHubspaces.length)].map((index) => (
          <HubSpaceAddCard key={`hubspace_add_card_${index}`} />
        ))} */}
      </div>
    </div>
  );
}
