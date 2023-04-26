import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../../lib/prisma";

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
    const item = await prisma.hub.findUnique({
      where: { hubPath: path },
    });
    res.json(item);
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
