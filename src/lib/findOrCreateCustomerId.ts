import { clerkClient } from "@clerk/nextjs";
import { stripe } from "./stripe";

export const findOrCreateCustomerId = async ({
  clerkUserId,
}: {
  clerkUserId: string;
}) => {
  let user = await clerkClient.users.getUser(clerkUserId);

  // if user already has a stripeCustomerId, return it
  if (user.publicMetadata.stripeCustomerId) {
    return user.publicMetadata.stripeCustomerId as string;
  }

  // otherwise, create a new customer and save the stripeCustomerId
  const customerCreate = await stripe.customers.create({
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddresses.find((x) => x.id === user.primaryEmailAddressId)!
      .emailAddress,
    metadata: {
      clerkUserId: user.id,
    },
  });

  user = await clerkClient.users.updateUser(user.id, {
    publicMetadata: {
      stripeCustomerId: customerCreate.id,
    },
  });

  return user.publicMetadata.stripeCustomerId as string;
};
