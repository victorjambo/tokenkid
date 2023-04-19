import Spinner from "@/components/spinner";
import { useWalletContext } from "@/context/wallet";
import { classNames } from "@/utils/classNames";
import { toWei } from "@/utils/weiConversions";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { getFirstOrString } from "@/utils/stringUtils";
import {
  useCurrentAllowance,
  useMintedToken,
} from "@/hooks/fetchContractDetails";

const BuyToken: React.FC = () => {
  const {
    tokenKidContract,
    ERC20,
    currentToken: { ERC20Tokens },
  } = useWalletContext();
  const { address } = useAccount();
  const [loadingAllowance, setLoadingAllowance] = useState(false);
  const [loadingBuyToken, setLoadingBuyToken] = useState(false);

  const router = useRouter();
  const tokenId = getFirstOrString(router.query.tokenId);
  const chain = getFirstOrString(router.query.chain);

  const { mintedToken } = useMintedToken(tokenId, chain);
  const { fetchAllowance, currentAllowance } = useCurrentAllowance(
    tokenId,
    chain
  );

  const setAllowance = async () => {
    setLoadingAllowance(true);
    const priceInWei = toWei(mintedToken?.price).toString();
    const { wait } = await ERC20.setAllowance(priceInWei);
    await fetchAllowance();
    await wait()
      .then(() => onReceipt())
      .catch((err) => onError(err));
  };

  const buyToken = async () => {
    setLoadingBuyToken(true);
    const _tokenId = +mintedToken?.tokenId;
    const priceInWei = toWei(mintedToken?.price).toNumber();

    const { wait } = await tokenKidContract.buyToken(
      _tokenId,
      priceInWei,
      ERC20Tokens.address,
      address
    );

    await wait()
      .then(() => onReceipt())
      .catch((err) => onError(err));
  };

  const onReceipt = () => {
    setLoadingAllowance(false);
    setLoadingBuyToken(false);
  };

  const onError = (err) => {
    console.log({ err });
    setLoadingAllowance(false);
    setLoadingBuyToken(false);
  };

  return (
    <>
      <button
        className={classNames(
          "bg-blue-lightblue rounded-full px-6 py-3 text-white text-center font-semibold",
          +currentAllowance >= +mintedToken?.price
            ? "bg-gray-400 cursor-not-allowed"
            : ""
        )}
        onClick={setAllowance}
        data-tip=""
        data-for="set-allowance"
        data-offset="{'top': 24}"
        disabled={+currentAllowance >= +mintedToken?.price}
      >
        <span className="flex flex-row items-center space-x-2 justify-center">
          <span>Set Allowance</span>
          {loadingAllowance && (
            <Spinner className="text-current animate-spin-slow w-5 h-5" />
          )}
        </span>
      </button>
      <button
        className={classNames(
          "rounded-full px-6 py-3 text-white text-center font-semibold",
          +currentAllowance < +mintedToken?.price
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-primary"
        )}
        disabled={+currentAllowance < +mintedToken?.price}
        onClick={buyToken}
      >
        <span className="flex flex-row items-center space-x-2 justify-center">
          <span>Buy Token</span>
          {loadingBuyToken && (
            <Spinner className="text-current animate-spin-slow w-5 h-5" />
          )}
        </span>
      </button>
      <ReactTooltip effect="solid" id="set-allowance">
        ERC-20 allowance to transfer {mintedToken?.tokenName}
      </ReactTooltip>
    </>
  );
};

export default BuyToken;
