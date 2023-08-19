import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

export async function handleGET(res: NextApiResponse) {
  try {
    const items = await prisma.hub.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).send(items);
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function handleDELETE(res: NextApiResponse) {
  try {
    const deletedItem = await prisma.hub.deleteMany();
    return res.send(deletedItem);
  } catch (error) {
    return res.status(400).send({ error });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createdItem = await prisma.hub.create({
      data: { ...req.body },
    });
    return res.send(createdItem);
  } catch (error) {
    return res.status(400).send({ error });
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGET(res);
    case "DELETE":
      return handleDELETE(res);
    case "POST":
      return handlePOST(req, res);
    case "OPTIONS":
      return res.status(200).end();
    default: // Method Not Allowed
      return res.status(405).end();
  }
}
