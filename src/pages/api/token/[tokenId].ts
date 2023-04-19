// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Subgraph from "@/api/subgraph";
import { CHAIN_IDS, GraphToken } from "@/types";
import { SUPPORTED_CHAIN_IDS } from "@/utils/constants";
import { getFirstOrString } from "@/utils/stringUtils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GraphToken | Record<"error", string>>
) {
  const tokenId = getFirstOrString(req.query.tokenId);
  const chainId = getFirstOrString(req.query.chain);

  if (!chainId) {
    res.status(400).json({ error: "URL missing chain id `?chain=1`" });
  } else if (!tokenId) {
    res.status(400).json({ error: "URL missing token id" });
  } else if (!(SUPPORTED_CHAIN_IDS as number[]).includes(+chainId)) {
    res
      .status(400)
      .json({ error: `supported chains: ${SUPPORTED_CHAIN_IDS.join(", ")}` });
  }

  const subgraph = new Subgraph();
  const tokens = await subgraph.getTokenById(+tokenId, +chainId as CHAIN_IDS);

  if (tokens == null) {
    res.status(404).json({ error: "TOKEN_NOT_FOUND" });
  }

  res.status(200).json(tokens);
}
