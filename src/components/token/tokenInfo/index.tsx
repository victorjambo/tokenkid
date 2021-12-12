import { useContractsContext } from "@/context/contractsContext";
import { fetchFromContract } from "@/hooks/fetchFromContract";
import { ModalType, openModal, setModalType } from "@/state/modal/slice";
import { setCurrentToken } from "@/state/tokens/slice";
import { toWei } from "@/utils/weiConversions";
import { useContractKit } from "@celo-tools/use-contractkit";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

type Inputs = {
  tokenPrice: number;
};

const TokenInfo: React.FC = () => {
  const dispatch = useDispatch();

  const [showPriceInput, setShowPriceInput] = useState(false);

  const { loading, tokenKidFactoryContract } = useContractsContext();

  const { performActions, address } = useContractKit();

  const { tokeninfo, fetchMintedToken } = fetchFromContract();

  const { owner, tokenName, price, tokenId } = tokeninfo;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const changeTokenPrice = async (_price: number) => {
    await performActions(async (kit) => {
      const priceInWei = toWei(_price);
      await tokenKidFactoryContract.changeTokenPrice(
        +tokenId,
        priceInWei,
        kit.defaultAccount,
        onReceipt,
        onError
      );
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { tokenPrice } = data;
    await changeTokenPrice(tokenPrice);
  };

  const onReceipt = async (_receipt) => {
    setShowPriceInput(false);
    await fetchMintedToken();
  };

  const onError = (err) => {
    console.log({ err });
  };

  const handleDeleteToken = () => {
    dispatch(setModalType(ModalType.DELETE_TOKEN));
    dispatch(openModal());
    dispatch(setCurrentToken(tokeninfo));
  };

  return (
    <div className="flex flex-row justify-between bg-gray-state rounded-xl p-8">
      <div className="flex flex-col">
        <div className="text-sm text-gray-400 flex flex-row">
          <span className="pr-2">Token Name</span>
          {owner && owner === address && (
            <button onClick={handleDeleteToken}>
              <TrashIcon className="w-5 h-5 text-rose-400 hover:text-rose-700" />
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
            <button onClick={() => setShowPriceInput(!showPriceInput)}>
              <PencilAltIcon className="w-5 h-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
        <div className="text-lg font-semibold">
          {loading ? (
            <div className="animate-pulse h-5 rounded-xl bg-gray-200" />
          ) : showPriceInput ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  className="px-2 py-1 rounded-md border border-gray-300"
                  {...register("tokenPrice", {
                    required: true,
                    min: 1,
                  })}
                />
                {errors.tokenPrice && (
                  <p className="text-red-400 text-sm">
                    {errors.tokenPrice?.type === "required" && "Required Field"}
                    {errors.tokenPrice?.type === "min" && "Cannot be < 0"}
                  </p>
                )}
                <div className="flex flex-row space-x-2">
                  <button
                    onClick={() => setShowPriceInput(false)}
                    className="px-2 py-1 rounded-md bg-red-400 text-white w-full"
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-1 rounded-md bg-green-500 text-white w-full"
                  >
                    save
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <span>{price}&nbsp; cUSD</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
