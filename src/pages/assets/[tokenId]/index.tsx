import GradientAvatar from "@/components/avatar";
import { useContractsContext } from "@/context/contractsContext";
import { shortAddress } from "@/utils/shortAddress";
import { useContractKit } from "@celo-tools/use-contractkit";
import { tokenAddresses } from "@/utils/tokenAddresses";
import { classNames } from "@/utils/classNames";
import ReactTooltip from "react-tooltip";
import TokenPriceHistory from "@/components/tokenPriceHistory";
import { ZERO_ADDRESS } from "@/utils/constants";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { toWei } from "@/utils/weiConversions";
import { PencilAltIcon } from "@heroicons/react/solid";

const Assets: React.FC = () => {
  const { tokenKidFactoryContract, loading, ERC20 } = useContractsContext();

  const {
    performActions,
    address,
    network: { name },
  } = useContractKit();

  const { tokeninfo, currentAllowance, approved, fetchAllowance } =
    fetchFromContract();

  const setAllowance = async () => {
    const priceInWei = toWei(tokeninfo.price);
    await ERC20.setAllowance(priceInWei, onReceipt, onError, onTransactionHash);
    await fetchAllowance();
  };

  const buyToken = async () => {
    await performActions(async (kit) => {
      const _tokenId = +tokeninfo.tokenId;
      const priceInWei = toWei(tokeninfo.price);
      const cUSDToken = tokenAddresses[name].ERC20Tokens.cUSD;
      await tokenKidFactoryContract.buyToken(
        _tokenId,
        priceInWei,
        cUSDToken,
        kit.defaultAccount,
        onReceipt,
        onError,
        onTransactionHash
      );
    });
  };

  // Refetch Approved after approving token
  const approveToken = async () => {
    await performActions(async (kit) => {
      const _tokenId = +tokeninfo.tokenId;
      await tokenKidFactoryContract.approve(
        _tokenId,
        kit.defaultAccount,
        onReceipt,
        onError,
        onTransactionHash
      );
    });
  };

  const onReceipt = (_receipt) => {
    console.log({ _receipt });
  };

  const onError = (err) => {
    console.log({ err });
  };
  const onTransactionHash = (hash) => {
    console.log({ hash });
  };

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
                shortAddress(tokeninfo.owner)
              )}{" "}
              {tokeninfo.owner && tokeninfo.owner === address && (
                <span className="italic text-gray-400 text-sm">(You)</span>
              )}
            </div>
            <div className="text-gray-400">Item Owner</div>
          </div>
        </div>

        <div className="flex flex-row justify-between bg-gray-state rounded-xl p-8">
          <div className="flex flex-col">
            <div className="text-sm text-gray-400 flex flex-row">
              <span className="pr-2">Token Name</span>
              {tokeninfo.owner && tokeninfo.owner === address && (
                <button className="cursor-pointer">
                  <PencilAltIcon className="w-5 h-5 text-gray-400 hover:text-gray-500" />
                </button>
              )}
            </div>
            <div className="text-lg font-semibold">
              {loading ? (
                <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
              ) : (
                tokeninfo.tokenName
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-400">Token Price</div>
            <div className="text-lg font-semibold">
              {loading ? (
                <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
              ) : (
                tokeninfo.price
              )}
              &nbsp; cUSD
            </div>
          </div>
        </div>

        {tokeninfo.owner &&
          tokeninfo.owner !== address &&
          approved !== ZERO_ADDRESS && (
            <>
              <button
                className="bg-blue-lightblue rounded-full px-6 py-3 text-white text-center font-semibold"
                onClick={setAllowance}
                data-tip=""
                data-for="set-allowance"
                data-offset="{'top': 24}"
                disabled={+currentAllowance < +tokeninfo.price}
              >
                Set Allowance {currentAllowance}
              </button>
              <button
                className={classNames(
                  "rounded-full px-6 py-3 text-white text-center font-semibold",
                  +currentAllowance < +tokeninfo.price
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-primary"
                )}
                disabled={+currentAllowance < +tokeninfo.price}
                onClick={buyToken}
              >
                Buy Token
              </button>
              <ReactTooltip effect="solid" id="set-allowance">
                ERC-20 allowance to transfer cUSD
              </ReactTooltip>
            </>
          )}
        {tokeninfo.owner &&
          tokeninfo.owner !== address &&
          approved === ZERO_ADDRESS && (
            <div>Token has not been approved by owner</div>
          )}
        {tokeninfo.owner &&
          tokeninfo.owner === address &&
          approved === ZERO_ADDRESS && (
            <>
              <button
                className={classNames(
                  "bg-pink-primary rounded-full px-6 py-3 text-white text-center font-semibold"
                )}
                onClick={approveToken}
                data-tip=""
                data-for="approve-token"
                data-offset="{'top': 24}"
              >
                Approve Token
              </button>
              <ReactTooltip effect="solid" id="approve-token">
                Approve Marketplace to transfer Token ownership on your behalf
              </ReactTooltip>
            </>
          )}

        <TokenPriceHistory />
      </div>
    </div>
  );
};

export default Assets;
