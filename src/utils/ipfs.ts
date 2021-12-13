import { create } from "ipfs-http-client";

export const IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";
export const IPFS_UNPIN_URL = "https://ipfs.infura.io:5001/api/v0/pin/rm?arg=";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const unpin = async (uri: string) => {
  const url = IPFS_UNPIN_URL + uri.split("/")[4];
  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: auth,
    },
  });
  return response.json();
};
