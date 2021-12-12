import { useContractsContext } from "@/context/contractsContext";
import { AppState } from "@/state";
import { closeModal } from "@/state/modal/slice";
import { useContractKit } from "@celo-tools/use-contractkit";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";

const DeleteToken: React.FC = () => {
  const dispatch = useDispatch();

  const { performActions } = useContractKit();

  const {
    tokens: { currentToken: tokeninfo },
  } = useSelector((state: AppState) => state);

  const { tokenKidFactoryContract } = useContractsContext();

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    await performActions(async (kit) => {
      const _tokenId = +tokeninfo.tokenId;
      await tokenKidFactoryContract.burnToken(
        _tokenId,
        kit.defaultAccount,
        onReceipt,
        onError
      );
    });
  };

  const onReceipt = () => {
    dispatch(closeModal());
  };

  const onError = (_error) => {
    console.log({ _error });
    dispatch(closeModal());
    // dispatch(setModalType(ModalType.WALLET_ERROR));
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
