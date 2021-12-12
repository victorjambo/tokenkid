import Link from "next/link";
import GradientAvatar from "@/components/avatar";
import { useContractsContext } from "@/context/contractsContext";
import { shortAddress } from "@/utils/shortAddress";
import { useContractKit } from "@celo-tools/use-contractkit";
import { ZERO_ADDRESS } from "@/utils/constants";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import TokenInfo from "@/components/token/tokenInfo";
import ApproveToken from "@/components/token/approveToken";
import BuyToken from "@/components/token/buyToken";
import TokenActivity from "@/components/token/tokenActivity";

const Assets: React.FC = () => {
  const { loading } = useContractsContext();

  const { address } = useContractKit();

  const { tokeninfo, approved, fetchApproved } = fetchFromContract();

  return (
    <div className="container m-auto py-24 flex flex-row space-x-6">
      <div className="w-1/2 flex flex-col sticky top-20 h-full">
        <div className="mb-8">
          {loading ? (
            <div className="animate-pulse h-96 rounded-xl bg-gray-200" />
          ) : (
            <img className="w-full rounded-xl" src={tokeninfo.tokenURI} />
          )}
        </div>
      </div>
      <div className="w-1/2 flex flex-col space-y-5">
        <div className="font-bold text-2xl">Description</div>
        <div className="text-gray-400">
          {loading ? (
            <div className="animate-pulse h-20 rounded-xl bg-gray-200" />
          ) : (
            tokeninfo.tokenDesc
          )}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className=" border-2 border-pink-primary rounded-full">
            <GradientAvatar address={tokeninfo.owner} />
          </div>
          <div className="flex flex-col">
            <div className="text-lg">
              {loading ? (
                <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
              ) : (
                <Link href={`/profile/${tokeninfo.owner}`}>
                  <span className="cursor-pointer">{shortAddress(tokeninfo.owner)}</span>
                </Link>
              )}
              {tokeninfo.owner && tokeninfo.owner === address && (
                <span className="italic text-gray-400 text-sm">(You)</span>
              )}
            </div>
            <div className="text-gray-400">Item Owner</div>
          </div>
        </div>

        <TokenInfo />

        {tokeninfo.owner &&
          tokeninfo.owner !== address &&
          approved !== ZERO_ADDRESS && <BuyToken />}
        {tokeninfo.owner &&
          tokeninfo.owner !== address &&
          approved === ZERO_ADDRESS && (
            <div>Token has not been approved by owner</div>
          )}
        {tokeninfo.owner &&
          tokeninfo.owner === address &&
          approved === ZERO_ADDRESS && (
            <ApproveToken fetchApproved={fetchApproved} />
          )}

        <TokenActivity />
      </div>
    </div>
  );
};

export default Assets;
