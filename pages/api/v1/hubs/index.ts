import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

export async function handleGET(res: NextApiResponse) {
  try {
    const items = await prisma.hub.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function handleDELETE(res: NextApiResponse) {
  try {
    const deletedItem = await prisma.hub.deleteMany();
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send({ error });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createdItem = await prisma.hub.create({
      data: { ...req.body },
    });
    res.send(createdItem);
  } catch (error) {
    res.status(400).send({ error });
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      handleGET(res);
      break;
    case "DELETE":
      handleDELETE(res);
      break;
    case "POST":
      handlePOST(req, res);
      break;
    default: // Method Not Allowed
      res.status(405).end();
      break;
  }
}

export const hub = {
  api: {
    externalResolver: true,
  },
};
