export function isOwnerAnOrganisation(ownerId: string) {
  return ownerId.includes("org_");
}
