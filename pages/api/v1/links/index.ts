import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../lib/prisma";

// GET
async function handleGET(res: NextApiResponse, hubId: number) {
  try {
    let items;
    if (hubId && !Number.isNaN(hubId)) {
      items = await prisma.link.findMany({ where: { hubId } });
    } else {
      items = await prisma.link.findMany();
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ error });
  }
}

// DELETE
async function handleDELETE(res: NextApiResponse) {
  try {
    const deletedItem = await prisma.link.deleteMany();
    res.json(deletedItem);
  } catch (error) {
    res.status(400).json({ error });
  }
}

// POST
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createdItem = await prisma.link.create({
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
  const hubId = Number(req.query.hubId);
  switch (req.method) {
    case "GET":
      handleGET(res, hubId);
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

export const config = {
  api: {
    externalResolver: true,
  },
};
