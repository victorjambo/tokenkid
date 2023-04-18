import Link from "next/link";
import GradientAvatar from "@/components/avatar";
import { shortAddress } from "@/utils/shortAddress";
import { ZERO_ADDRESS } from "@/utils/constants";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import TokenInfo from "@/components/token/tokenInfo";
import ApproveToken from "@/components/token/approveToken";
import BuyToken from "@/components/token/buyToken";
import TokenActivity from "@/components/token/tokenActivity";
import { IPFS_BASE_URL, NEW_IPFS_BASE_URL } from "@/utils/ipfs";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useWalletContext } from "@/context/wallet";
import AppWrapper from "@/containers/AppWrapper";

const Assets: React.FC = () => {
  const { address } = useAccount();

  const { approved, tokeninfo } = fetchFromContract();
  const { loading } = useWalletContext();

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (tokeninfo && tokeninfo.tokenURI.startsWith(IPFS_BASE_URL)) {
      const str = tokeninfo.tokenURI.replace(IPFS_BASE_URL, NEW_IPFS_BASE_URL);
      setImgSrc(str);
    } else {
      setImgSrc(tokeninfo?.tokenURI);
    }
  }, [tokeninfo]);

  return (
    <AppWrapper>
      <div className="container m-auto py-24 flex flex-row space-x-6">
        <div className="w-1/2 flex flex-col sticky top-20 h-full">
          <div className="mb-8">
            {loading || !tokeninfo ? (
              <div className="animate-pulse h-96 rounded-xl bg-gray-200" />
            ) : (
              <img className="w-full rounded-xl" src={imgSrc} />
            )}
          </div>
        </div>
        <div className="w-1/2 flex flex-col space-y-5">
          <div className="font-bold text-2xl">Description</div>
          <div className="text-gray-400">
            {loading || !tokeninfo ? (
              <div className="animate-pulse h-20 rounded-xl bg-gray-200" />
            ) : (
              tokeninfo?.tokenDesc
            )}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className=" border-2 border-pink-primary rounded-full">
              {tokeninfo && <GradientAvatar address={tokeninfo.owner} />}
            </div>
            <div className="flex flex-col">
              <div className="text-lg">
                {loading || !tokeninfo ? (
                  <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
                ) : (
                  <Link href={`/profile/${tokeninfo?.owner}`}>
                    <span className="cursor-pointer">
                      {shortAddress(tokeninfo.owner)}
                    </span>
                  </Link>
                )}
                {tokeninfo &&
                  tokeninfo.owner &&
                  tokeninfo.owner === address && (
                    <span className="italic text-gray-400 text-sm">(You)</span>
                  )}
              </div>
              <div className="text-gray-400">Item Owner</div>
            </div>
          </div>

          {tokeninfo && <TokenInfo />}

          {tokeninfo &&
            tokeninfo.owner &&
            tokeninfo.owner !== address &&
            approved !== ZERO_ADDRESS && <BuyToken />}
          {tokeninfo &&
            tokeninfo.owner &&
            tokeninfo.owner !== address &&
            approved === ZERO_ADDRESS && (
              <div>Token has not been approved by owner</div>
            )}
          {tokeninfo &&
            tokeninfo.owner &&
            tokeninfo.owner === address &&
            approved === ZERO_ADDRESS && <ApproveToken />}

          <TokenActivity />
        </div>
      </div>
    </AppWrapper>
  );
};

export default Assets;
