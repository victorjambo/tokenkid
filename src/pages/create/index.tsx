import PageHeader from "@/containers/pageHeader";
import { useState } from "react";
import { ipfs, NEW_IPFS_BASE_URL } from "@/utils/ipfs";
import { classNames } from "@/utils/classNames";
import { useForm, SubmitHandler } from "react-hook-form";
import Activity from "@/components/activity";
import { ICreateStates, IReceipt } from "@/types";
import { toWei } from "@/utils/weiConversions";
import { useWalletContext } from "@/context/wallet";
import { TOKENS } from "@/utils/tokenAddresses";

type Inputs = {
  tokenName: string;
  tokenDesc: string;
  tokenPrice: number;
  tokenImage: any;
};

const defaultState: ICreateStates = {
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
  const [receipt, setRecipt] = useState<IReceipt>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [states, setStates] = useState<ICreateStates>(defaultState);
  const [showActivity, setShowActivity] = useState(false);
  const [showWall, setShowWall] = useState(false);

  const { tokenKidContract } = useWalletContext();

  const tokenName = TOKENS[5].ERC20Tokens.name; // TODO

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { tokenImage, tokenName, tokenPrice, tokenDesc } = data;
    setShowWall(true);
    setShowActivity(true);

    // upload image to infura ipfs
    // const cidPath = "QmTrwdNtajY9RhZyXLSKN7F6SrQHWcL1wXES8VzvaU73LX";
    const cidPath = await uploadImgToInfuraIPFFS(tokenImage[0]);
    const tokenURI = `${NEW_IPFS_BASE_URL}${cidPath}/`;

    // Waiting for transaction Hash
    updateState("txHash", "loading", true);

    const priceInWei = toWei(tokenPrice).toString();

    const { hash, wait } = await tokenKidContract.safeMint(
      tokenName,
      priceInWei,
      tokenURI,
      tokenDesc
    );

    onTransactionHash(hash);

    await wait()
      .then((res) => onReceipt(res))
      .catch((err) => onTransactionError(err));
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
      setTxError({ message: "Error uploading image. Check console" });
      setShowAlert(true);
      updateState("upload", "loading", false);
      updateState("upload", "error", true);
      setShowWall(false);
      throw error.message;
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
    setStates((prev) => {
      return {
        ...prev,
        [noun]: {
          ...prev[noun],
          [pronoun]: verb,
        },
      };
    });
  };

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
                    <label htmlFor="tokenName">Token Description</label>
                    <textarea
                      id="tokenDesc"
                      className={classNames(
                        "px-4 py-2 border rounded-md",
                        errors.tokenName ? "border-red-400" : ""
                      )}
                      placeholder="Token Description"
                      {...register("tokenDesc", {
                        required: true,
                      })}
                    />
                    <p className="text-red-400 text-sm">
                      {errors.tokenDesc && "Required Field"}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="tokenPrice">
                      Price <span className="italic text-gray-400">({tokenName})</span>
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

            <Activity
              show={showActivity}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              txError={txError}
              states={states}
              txHash={txHash}
              receipt={receipt}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
