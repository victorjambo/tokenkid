import Web3 from "web3";
import BN from "bn.js";
import PageHeader from "@/containers/pageHeader";
import { useEffect, useState } from "react";
import { ipfs, IPFS_BASE_URL } from "@/utils/ipfs";
import { useContractsContext } from "@/context/contractsContext";
import { classNames } from "@/utils/classNames";
import { useForm, SubmitHandler } from "react-hook-form";
import { Transition } from "@headlessui/react";
import StateIcon from "@/components/stateIcon";
import Alert from "@/components/alert";

type Inputs = {
  tokenName: string;
  tokenPrice: number;
  tokenImage: any;
};

const defaultState = {
  upload: {
    loading: false,
    done: false,
    error: false,
  },
  txHash: {
    loading: false,
    done: false,
    error: false,
  },
  mint: {
    loading: false,
    done: false,
    error: false,
  },
};

const Create: React.FC = () => {
  const [cid, setCID] = useState(null);
  const [txHash, setTxHash] = useState("s");
  const [txError, setTxError] = useState(null); // txError.message
  const [receipt, setRecipt] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [states, setStates] = useState(defaultState);
  const [showActivity, setShowActivity] = useState(false);
  const [showWall, setShowWall] = useState(false);

  const { tokenKidFactoryContract } = useContractsContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { tokenImage, tokenName, tokenPrice } = data;
    setShowWall(true);
    setShowActivity(true);

    // upload image to infura ipfs
    // const cidPath = "QmPHjS67XiuMkWmuaV5gkjV7i8ksicEtVr4592HeApyFix";
    const cidPath = await uploadImgToInfuraIPFFS(tokenImage[0]);
    const tokenURI = `${IPFS_BASE_URL}${cidPath}/`;

    // Waiting for transaction Hash
    updateState("txHash", "loading", true);

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
    updateState("upload", "loading", true);
    if (cid) {
      updateState("upload", "loading", false);
      return cid.path;
    }
    
    try {
      const _cid = await ipfs.add(image);
      setCID(_cid);
      updateState("upload", "loading", false);
      updateState("upload", "done", true);
      return _cid.path;
    } catch (error) {
      setTxError({message: "Error uploading image. Check console"});
      setShowAlert(true);
      return;
    }
  };

  const onTransactionHash = (hash: string) => {
    setTxHash(hash);
    updateState("txHash", "loading", false);
    updateState("txHash", "done", true);
    updateState("mint", "loading", true);
  };

  const onTransactionError = (err) => {
    setTxError(err);
    setShowAlert(true);
    setStates(defaultState);
    setShowWall(false);
  };

  const onReceipt = (_receipt) => {
    setRecipt(_receipt);
    updateState("mint", "loading", false);
    updateState("mint", "done", true);
  };

  const updateState = (noun: string, pronoun: string, verb: boolean) => {
    setStates(prev => {
      return {
        ...prev,
        [noun]: {
          ...prev[noun],
          [pronoun]: verb,
        }
      }
    });
  }

  return (
    <>
      <PageHeader title="Create" />
      <div className="bg-white-back w-full pt-24 pb-96">
        <div className="container m-auto">
          <div className="flex flex-row mb-6 space-x-20">
            <div className="flex flex-col w-full">
              <div className="text-3xl pb-4">Create Collectible Item</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col bg-white py-10 px-5 rounded-lg space-y-6 relative">
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
                      {...register("tokenPrice", { required: true, min: 1 })}
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
                  <div
                    className={classNames(
                      "absolute inset-0 bg-white opacity-50 rounded-lg",
                      showWall ? "" : "hidden",
                      states.mint.done ? "cursor-not-allowed" : "cursor-wait"
                    )}
                  />
                </div>
              </form>
            </div>

            <Transition
              show={showActivity}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full opacity-0"
            >
              <div className="flex flex-col whitespace-nowrap">
                <div className="text-3xl pb-4">&nbsp;</div>
                <div className="flex flex-col bg-white py-10 px-5 rounded-lg space-y-6">
                  <div className="text-2xl">Activity</div>
                  <Alert
                    variant="error"
                    closable={true}
                    show={showAlert}
                    setShow={setShowAlert}
                  >
                    {txError?.message}
                  </Alert>
                  <div className="flex flex-row items-center space-x-2">
                    <StateIcon states={states.upload} />
                    <span>
                      {states.upload.loading
                        ? "Uploading image "
                        : "Image uploaded "}
                      to <code>ipfs</code>
                    </span>
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <StateIcon states={states.txHash} />
                    <span>
                      {states.txHash.loading
                        ? "Approving Transaction "
                        : "Transaction Approved "}
                      {states.txHash.done && txHash && (
                        <a
                          href={`https://alfajores-blockscout.celo-testnet.org/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Transaction
                        </a>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <StateIcon states={states.mint} />
                    <span>
                      {states.mint.loading
                        ? "Minting Token"
                        : "Woohoo! Token Minted"}
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
