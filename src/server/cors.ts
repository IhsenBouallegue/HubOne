import { NextApiRequest, NextApiResponse } from "next";

export default function cors(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const { origin } = req.headers;

  const allowedSubdomainRegex = /^https?:\/\/(\w+\.)?huboneapp\.com$/i;
  if (process.env.PRODUCTION) {
    if (origin && allowedSubdomainRegex.test(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PATCH, POST, OPTIONS, DELETE, HEAD"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, PATCH, POST, OPTIONS, DELETE, HEAD"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  next();
}
