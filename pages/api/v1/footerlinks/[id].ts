import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

async function handleGET(itemId: number, res: NextApiResponse) {
  try {
    const item = await prisma.footerLink.findUnique({
      where: { id: itemId },
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function handleDELETE(itemId: number, res: NextApiResponse) {
  try {
    const deletedItem = await prisma.footerLink.delete({
      where: { id: itemId },
    });
    return res.status(200).json(deletedItem);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function handlePATCH(
  itemId: number,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const updatedItem = await prisma.footerLink.update({
      where: { id: itemId },
      data: { ...req.body },
    });
    return res.status(200).json(updatedItem);
  } catch (error) {
    return res.status(400).json({ error });
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
      return handleGET(id, res);
    case "DELETE":
      return handleDELETE(id, res);
    case "PATCH":
      return handlePATCH(id, req, res);
    case "OPTIONS":
      return res.status(200).end();
    default: // Method Not Allowed
      return res.status(405).end();
  }
}
