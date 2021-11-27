import Web3 from "web3";
import BN from "bn.js";
import PageHeader from "@/containers/pageHeader";
import { useState } from "react";
import { ipfs, IPFS_BASE_URL } from "@/utils/ipfs";
import { useContractsContext } from "@/context/contractsContext";
import { useContractKit } from "@celo-tools/use-contractkit";
import { classNames } from "@/utils/classNames";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  tokenName: string;
  tokenPrice: number;
  tokenImage: any;
};

const Create: React.FC = () => {
  const [cid, setCID] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [txError, setTxError] = useState(null); // txError.message
  const [receipt, setRecipt] = useState(null);

  const { tokenKidFactoryContract } = useContractsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = async (data: Inputs) => {
    const { tokenImage, tokenName, tokenPrice } = data;

    // upload image to infura ipfs
    // const cidPath = "QmPHjS67XiuMkWmuaV5gkjV7i8ksicEtVr4592HeApyFix";
    const cidPath = await uploadImgToInfuraIPFFS(tokenImage[0]);
    const tokenURI = `${IPFS_BASE_URL}${cidPath}/`;

    // Convert price to wei
    const priceInWei = Web3.utils.toWei(new BN(tokenPrice.toString()));

    await tokenKidFactoryContract.safeMint(
      tokenName,
      priceInWei,
      tokenURI,
      onReceipt,
      onTransactionError,
      onTransactionHash
    );
  };

  const uploadImgToInfuraIPFFS = async (image) => {
    if (cid) {
      return cid.path;
    }

    const _cid = await ipfs.add(image);
    setCID(_cid);
    return _cid.path;
  };

  const onTransactionHash = (hash: string) => {
    setTxHash(hash);
  };

  const onTransactionError = (err) => {
    setTxError(err);
  };

  const onReceipt = (_receipt) => {
    setRecipt(_receipt);
  };

  return (
    <>
      <PageHeader title="Create" />
      <div className="bg-white-back w-full pt-24 pb-96">
        <div className="flex flex-col container m-auto">
          <div className="text-3xl pb-4">Create Collectible Item</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col bg-white py-10 px-5 rounded-lg space-y-6">
              <div className="flex flex-col">
                <label htmlFor="tokenImage">Upload File</label>
                <input
                  id="tokenImage"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  {...register("tokenImage", {
                    required: true,
                  })}
                />
                <p className="text-red-400 text-sm">
                  {errors.tokenImage && "Required Field"}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="tokenName">Token Name</label>
                <input
                  id="tokenName"
                  className={classNames(
                    "px-4 py-2 border rounded-md",
                    errors.tokenName ? "border-red-400" : ""
                  )}
                  placeholder="Token Name"
                  {...register("tokenName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                <p className="text-red-400 text-sm">
                  {errors.tokenName && "Required Field"}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="tokenPrice">
                  Price <span className="italic text-gray-400">(cUSD)</span>
                </label>
                <input
                  id="tokenPrice"
                  className={classNames(
                    "px-4 py-2 border rounded-md",
                    errors.tokenPrice ? "border-red-400" : ""
                  )}
                  placeholder="Token Price"
                  type="number"
                  {...register("tokenPrice", { required: true })}
                />
                <p className="text-red-400 text-sm">
                  {errors.tokenPrice && "Required Field"}
                </p>
              </div>
              <input
                type="submit"
                value="Mint Token"
                className={classNames(
                  "border rounded-md py-3",
                  !Object.keys(errors).length
                    ? "hover:bg-green-600 bg-green-500 hover:text-white cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed text-gray-600"
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
