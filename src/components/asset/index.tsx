import { ZERO_ADDRESS } from "@/utils/constants";
import { shortAddress } from "@/utils/shortAddress";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import GradientAvatar from "../avatar";
import ApproveToken from "../token/approveToken";
import BuyToken from "../token/buyToken";
import TokenActivity from "../token/tokenActivity";
import TokenInfo from "../token/tokenInfo";
import Avatar from "./avatar";
import { GraphToken } from "@/types";
import { useTokenApproved, useMintedToken } from "@/hooks/fetchContractDetails";
import { getFirstOrString } from "@/utils/stringUtils";
import { useRouter } from "next/router";

const Asset: React.FC<{ loading: boolean; token: GraphToken }> = ({
  loading,
  token,
}) => {
  const router = useRouter();
  const { address } = useAccount();
  const tokenId = getFirstOrString(router.query.tokenId);
  const chain = getFirstOrString(router.query.chain);
  const { approved } = useTokenApproved(tokenId, chain);
  const { mintedToken } = useMintedToken(tokenId, chain);

  return (
    <div className="container m-auto py-24 flex flex-row space-x-6">
      <div className="w-1/2 flex flex-col sticky top-20 h-full">
        <Avatar {...{ loading, tokenURI: token._tokenURI }} />
      </div>
      <div className="w-1/2 flex flex-col space-y-5">
        <div className="font-bold text-2xl">Description</div>
        <div className="text-gray-400">
          {loading ? (
            <div className="animate-pulse h-20 rounded-xl bg-gray-200" />
          ) : (
            mintedToken?.tokenDesc
          )}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className=" border-2 border-pink-primary rounded-full">
            {token && <GradientAvatar address={token.owner} />}
          </div>
          <div className="flex flex-col">
            <div className="text-lg">
              {loading ? (
                <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
              ) : (
                <Link href={`/profile/${token.owner}`}>
                  <span className="cursor-pointer">
                    {shortAddress(token.owner)}
                  </span>
                </Link>
              )}
              {token.owner && token.owner === address && (
                <span className="italic text-gray-400 text-sm">(You)</span>
              )}
            </div>
            <div className="text-gray-400">Item Owner</div>
          </div>
        </div>

        <TokenInfo />

        {token.owner &&
          token.owner !== address &&
          approved !== ZERO_ADDRESS && <BuyToken />}
        {token.owner &&
          token.owner !== address &&
          approved === ZERO_ADDRESS && (
            <div>Token has not been approved by owner</div>
          )}
        {token.owner &&
          token.owner === address &&
          approved === ZERO_ADDRESS && <ApproveToken />}

        <TokenActivity />
      </div>
    </div>
  );
};

export default Asset;
