import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../lib/prisma";

// GET /api/hubs
async function handleGET(res: NextApiResponse) {
  try {
    const items = await prisma.hub.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// DELETE /api/hubs
async function handleDELETE(res: NextApiResponse) {
  try {
    const deletedItem = await prisma.hub.deleteMany();
    res.json(deletedItem);
  } catch (error) {
    res.status(400).json({ error });
  }
}

// POST /api/hubs
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createdItem = await prisma.hub.create({
      data: { ...req.body },
    });
    res.json(createdItem);
  } catch (error) {
    res.status(400).json({ error });
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
