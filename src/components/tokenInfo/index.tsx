import { useContractsContext } from "@/context/contractsContext";
import { toWei } from "@/utils/weiConversions";
import { useContractKit } from "@celo-tools/use-contractkit";
import { PencilAltIcon } from "@heroicons/react/solid";
import { useState } from "react";

interface ITokenInfo {
  owner: string;
  tokenName: string;
  price: number;
  tokenId: number;
}

const TokenInfo: React.FC<ITokenInfo> = ({
  owner,
  tokenName,
  price,
  tokenId,
}) => {
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const { loading, tokenKidFactoryContract } = useContractsContext();

  const { performActions, address } = useContractKit();

  const changeTokenPrice = async () => {
    await performActions(async (kit) => {
      const priceInWei = toWei(newPrice);
      await tokenKidFactoryContract.changeTokenPrice(
        +tokenId,
        priceInWei,
        kit.defaultAccount,
        onReceipt,
        onError,
        onTransactionHash
      );
    });
  };

  const handleChangeTokenPrice = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSaleChange = () => {};

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
    <div className="flex flex-row justify-between bg-gray-state rounded-xl p-8">
      <div className="flex flex-col">
        <div className="text-sm text-gray-400 flex flex-row">
          <span className="pr-2">Token Name</span>
          {owner && owner === address && (
            <button onClick={handleSaleChange}>
              <PencilAltIcon className="w-5 h-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
        <div className="text-lg font-semibold">
          {loading ? (
            <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
          ) : (
            tokenName
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm text-gray-400 flex flex-row">
          <span className="pr-2">Token Price</span>
          {owner && owner === address && (
            <button onClick={() => setShowPriceInput(true)}>
              <PencilAltIcon className="w-5 h-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
        <div className="text-lg font-semibold">
          {loading ? (
            <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
          ) : showPriceInput ? (
            <div className="flex flex-row space-x-2">
              <input
                type="number"
                value={newPrice}
                className="px-2 py-1 rounded-md border border-gray-300"
                onChange={handleChangeTokenPrice}
              />
              <button
                onClick={changeTokenPrice}
                className="px-2 py-1 rounded-md bg-green-500 text-white"
              >
                save
              </button>
            </div>
          ) : (
            <span>{price}&nbsp; cUSD</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
