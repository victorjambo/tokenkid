import { useWalletContext } from "@/context/wallet";
import { AppState } from "@/state";
import { closeModal, ModalType, openModal } from "@/state/modal/slice";
import { setTxHash, setWalletError } from "@/state/wallet/slice";
import { unpin } from "@/utils/ipfs";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const DeleteToken: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { tokenKidContract } = useWalletContext();

  const {
    tokens: { tokeninfo },
  } = useSelector((state: AppState) => state);

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    dispatch(openModal(ModalType.LOADING));

    const _tokenId = +tokeninfo.tokenId;
    const { hash, wait } = await tokenKidContract.burnToken(_tokenId);
    dispatch(setTxHash(hash));
    await wait()
      .then(() => onReceipt())
      .catch((err) => onError(err));
  };

  const onReceipt = async () => {
    try {
      await unpin(tokeninfo.tokenURI);
    } catch (error) {
      console.log({ error });
    }

    dispatch(openModal(ModalType.SUCCESS));
    router.push("/");
  };

  const onError = (_error) => {
    console.log({ _error });
    dispatch(setWalletError(_error.message));
    dispatch(openModal(ModalType.WALLET_ERROR));
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <InformationCircleIcon className="w-20 h-20 text-rose-400" />
      <span className="text-xl">
        Are you sure you want to Delete <b>{tokeninfo.tokenName}</b>
      </span>
      <span className="text-sm text-gray-400">
        This action is <span className="uppercase">irreversible</span>
      </span>
      <div className="flex flex-row space-x-5">
        <button
          className="bg-gray-300 px-4 py-2 rounded-md text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-rose-500 px-4 py-2 rounded-md text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteToken;
