import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

async function handleGET(id: number, res: NextApiResponse) {
  try {
    const item = await prisma.hub.findUnique({
      where: { id },
    });
    res.json(item);
  } catch (error) {
    res.json({ error });
  }
}

async function handleDELETE(id: number, res: NextApiResponse) {
  try {
    const deletedItem = await prisma.hub.delete({
      where: { id },
    });
    res.json(deletedItem);
  } catch (error) {
    res.json({ error });
  }
}

async function handlePATCH(
  id: number,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const updatedItem = await prisma.hub.update({
      where: { id },
      data: { ...req.body },
    });
    res.json(updatedItem);
  } catch (error) {
    res.json({ error });
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = Array.isArray(req.query.id)
    ? Number(req.query.id[0])
    : Number(req.query.id);

  switch (req.method) {
    case "GET":
      handleGET(id, res);
      break;
    case "DELETE":
      handleDELETE(id, res);
      break;
    case "PATCH":
      handlePATCH(id, req, res);
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
