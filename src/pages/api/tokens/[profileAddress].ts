// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Subgraph, { GraphToken } from "@/api/subgraph";
import { getFirstOrString } from "@/utils/stringUtils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GraphToken[]>
) {
  const profileAddress =  getFirstOrString(req.query.profileAddress);

  const subgraph = new Subgraph();
  const tokens = await subgraph.getAccountTokens(profileAddress);

  res.status(200).json(tokens);
}
