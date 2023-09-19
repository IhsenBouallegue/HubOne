import { clerkClient } from "@clerk/nextjs";
import { stripe } from "./stripe";

export const findOrCreateCustomerId = async ({
  clerkUserId,
  clerkOrgId,
}: {
  clerkUserId: string;
  clerkOrgId?: string;
}) => {
  let stripeCustomerId;

  if (clerkOrgId && clerkUserId) {
    const user = await clerkClient.users.getUser(clerkUserId);
    let organization = await clerkClient.organizations.getOrganization({
      organizationId: clerkOrgId,
    });
    // if user already has a stripeCustomerId, return it
    if (organization.publicMetadata?.stripeCustomerId) {
      return organization.publicMetadata.stripeCustomerId as string;
    }
    // otherwise, create a new customer and save the stripeCustomerId
    const createdCustomer = await stripe.customers.create({
      name: `${organization.name}`,
      email: user.emailAddresses.find(
        (x) => x.id === user.primaryEmailAddressId
      )!.emailAddress,
      metadata: {
        orgId: user.id,
      },
    });
    // update the organization's publicMetadata with the stripeCustomerId
    organization = await clerkClient.organizations.updateOrganization(
      organization.id,
      {
        publicMetadata: {
          stripeCustomerId: createdCustomer.id,
        },
      }
    );
    stripeCustomerId = createdCustomer.id;
  }

  let user = await clerkClient.users.getUser(clerkUserId);
  // if user already has a stripeCustomerId, return it
  if (user.publicMetadata.stripeCustomerId) {
    return user.publicMetadata.stripeCustomerId as string;
  }
  // otherwise, create a new customer and save the stripeCustomerId
  const createdCustomer = await stripe.customers.create({
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddresses.find((x) => x.id === user.primaryEmailAddressId)!
      .emailAddress,
    metadata: {
      userId: user.id,
    },
  });
  // update the user's publicMetadata with the stripeCustomerId
  user = await clerkClient.users.updateUser(user.id, {
    publicMetadata: {
      stripeCustomerId: createdCustomer.id,
    },
  });
  stripeCustomerId = createdCustomer.id;

  return stripeCustomerId;
};
