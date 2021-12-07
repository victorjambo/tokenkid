import { useContractsContext } from "@/context/contractsContext";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { classNames } from "@/utils/classNames";
import { tokenAddresses } from "@/utils/tokenAddresses";
import { toWei } from "@/utils/weiConversions";
import { useContractKit } from "@celo-tools/use-contractkit";
import ReactTooltip from "react-tooltip";

const BuyToken: React.FC = () => {
  const { tokenKidFactoryContract, ERC20 } = useContractsContext();

  const {
    performActions,
    network: { name },
  } = useContractKit();

  const { tokeninfo, currentAllowance, fetchAllowance } = fetchFromContract();

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
  );
};

export default BuyToken;
