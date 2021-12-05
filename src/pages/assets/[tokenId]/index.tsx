import BN from "bn.js";
import Web3 from "web3";
import GradientAvatar from "@/components/avatar";
import { useContractsContext } from "@/context/contractsContext";
import TokenKidFactoryContract from "@/contracts/TokenKidFactory";
import { ITokenKid } from "@/state/wallet/types";
import { shortAddress } from "@/utils/shortAddress";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { tokenAddresses } from "@/utils/tokenAddresses";
import { classNames } from "@/utils/classNames";
import ERC20Contract from "@/contracts/ERC20";
import ReactTooltip from "react-tooltip";
import TokenPriceHistory from "@/components/tokenPriceHistory";
import { ZERO_ADDRESS } from "@/utils/constants";

const defaultTokenInfo: ITokenKid = {
  tokenId: null,
  tokenName: "",
  owner: "",
  previousOwner: "",
  price: 0,
  tokenURI: "",
  isOnSale: false,
  tokenDesc: "",
};

const Assets: React.FC = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const [tokeninfo, setTokeninfo] = useState<ITokenKid>(defaultTokenInfo);
  const [currentAllowance, setCurrentAllowance] = useState(null);
  const [approved, setApproved] = useState(null);

  const { tokenKidFactoryContract, loading, setLoading, ERC20 } =
    useContractsContext();

  const {
    performActions,
    address,
    network: { name },
  } = useContractKit();

  const fetchMintedToken = useCallback(async () => {
    setLoading(true);
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const token = await tokenKidFactoryContract.getMintedToken(+tokenId);
        setTokeninfo(token);
        setLoading(false);
      }
    });
  }, [tokenKidFactoryContract, router.isReady]);

  const fetchAllowance = useCallback(async () => {
    if (ERC20 instanceof ERC20Contract) {
      const _currentAllowance = await ERC20.getAllowance();
      setCurrentAllowance(_currentAllowance / 10 ** 18);
    }
  }, [ERC20]);

  const fetchApproved = useCallback(async () => {
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const _approved = await tokenKidFactoryContract.getApproved(+tokenId);
        setApproved(_approved);
      }
    });
  }, [tokenKidFactoryContract, router.isReady]);

  useEffect(() => {
    void fetchMintedToken();
    void fetchAllowance();
    void fetchApproved();
  }, [fetchMintedToken, fetchAllowance, fetchApproved]);

  const setAllowance = async () => {
    const priceInWei = Web3.utils.toWei(new BN(tokeninfo.price));
    await ERC20.setAllowance(priceInWei, onReceipt, onError, onTransactionHash);
    fetchAllowance();
  };

  const buyToken = async () => {
    await performActions(async (kit) => {
      const _tokenId = +tokeninfo.tokenId;
      const priceInWei = Web3.utils.toWei(new BN(tokeninfo.price.toString()));
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

  // TODO: Grp this in a hook
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
            <div className="text-sm text-gray-400">Token Name</div>
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
              )}{" "}
              cUSD
            </div>
          </div>
        </div>

        {tokeninfo.owner && tokeninfo.owner !== address && approved !== ZERO_ADDRESS && (
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
        {tokeninfo.owner && tokeninfo.owner !== address && approved === ZERO_ADDRESS && (
          <div>Token has not been approved by owner</div>
        )}
        {tokeninfo.owner && tokeninfo.owner === address && approved === ZERO_ADDRESS && (
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
