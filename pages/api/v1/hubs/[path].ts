import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../lib/prisma";

// GET
async function handleGET(path: string, res: NextApiResponse) {
  try {
    const item = await prisma.hub.findUnique({
      where: { hubPath: path },
    });
    res.json(item);
  } catch (error) {
    res.json({ error });
  }
}
// DELETE
async function handleDELETE(path: string, res: NextApiResponse) {
  try {
    const deletedItem = await prisma.hub.delete({
      where: { hubPath: path },
    });
    res.json(deletedItem);
  } catch (error) {
    res.json({ error });
  }
}

// PATCH
async function handlePATCH(
  path: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const updatedItem = await prisma.hub.update({
      where: { hubPath: path },
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
  const path: string = Array.isArray(req.query.path)
    ? String(req.query.path[0])
    : String(req.query.path);

  switch (req.method) {
    case "GET":
      handleGET(path, res);
      break;
    case "DELETE":
      handleDELETE(path, res);
      break;
    case "PATCH":
      handlePATCH(path, req, res);
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
