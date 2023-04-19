// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Subgraph from "@/api/subgraph";
import { GraphToken } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GraphToken[]>
) {
  const subgraph = new Subgraph();
  const tokens = await subgraph.getTokens();
   
  res.status(200).json(tokens);
}
