import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../../lib/prisma";

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

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let path = "";
  if (req.query.path) {
    path = Array.isArray(req.query.path)
      ? String(req.query.path[0])
      : String(req.query.path);
  }
  if (req.method === "GET") {
    handleGET(path, res);
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
