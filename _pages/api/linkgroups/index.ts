import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

// GET
async function handleGET(res: NextApiResponse, hubId: number) {
  try {
    let items;
    if (hubId && !Number.isNaN(hubId)) {
      items = await prisma.linkGroup.findMany({
        where: { hubId },
        orderBy: {
          id: "asc",
        },
      });
    } else {
      items = await prisma.linkGroup.findMany();
    }
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// DELETE
async function handleDELETE(res: NextApiResponse) {
  try {
    const deletedItem = await prisma.linkGroup.deleteMany();
    return res.json(deletedItem);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// POST
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createdItem = await prisma.linkGroup.create({
      data: { ...req.body },
    });
    return res.json(createdItem);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hubId = Number(req.query.hubId);
  switch (req.method) {
    case "GET":
      return handleGET(res, hubId);
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
