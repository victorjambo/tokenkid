import Spinner from "@/components/spinner";
import { useContractsContext } from "@/context/contractsContext";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { classNames } from "@/utils/classNames";
import { tokenAddresses } from "@/utils/tokenAddresses";
import { toWei } from "@/utils/weiConversions";
import { useState } from "react";
import ReactTooltip from "react-tooltip";

const BuyToken: React.FC = () => {
  const { tokenKidFactoryContract, ERC20 } = useContractsContext();
  const [loadingAllowance, setLoadingAllowance] = useState(false);
  const [loadingBuyToken, setLoadingBuyToken] = useState(false);

  const name = "Alfajores"; // TODO

  const { tokeninfo, currentAllowance, fetchAllowance } = fetchFromContract();

  const setAllowance = async () => {
    setLoadingAllowance(true);
    const priceInWei = toWei(tokeninfo.price);
    await ERC20.setAllowance(priceInWei, onReceipt, onError);
    await fetchAllowance();
  };

  const buyToken = async () => {
    setLoadingBuyToken(true);
    const _tokenId = +tokeninfo.tokenId;
    const priceInWei = toWei(tokeninfo.price);
    const cUSDToken = tokenAddresses[name].ERC20Tokens.cUSD;
    await tokenKidFactoryContract.buyToken(
      _tokenId,
      priceInWei,
      cUSDToken,
      "0x8d5d1CC09Cef15463A3759Bce99C23d19Cc97b6c",
      onReceipt,
      onError
    );
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
          +currentAllowance >= +tokeninfo.price
            ? "bg-gray-400 cursor-not-allowed"
            : ""
        )}
        onClick={setAllowance}
        data-tip=""
        data-for="set-allowance"
        data-offset="{'top': 24}"
        disabled={+currentAllowance >= +tokeninfo.price}
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
          +currentAllowance < +tokeninfo.price
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-primary"
        )}
        disabled={+currentAllowance < +tokeninfo.price}
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
        ERC-20 allowance to transfer cUSD
      </ReactTooltip>
    </>
  );
};

export default BuyToken;
