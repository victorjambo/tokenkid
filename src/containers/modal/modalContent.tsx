import { ModalType } from "@/state/modal/slice";
import DeleteToken from "./deleteToken";
import ErrorModal from "./errorModal";
import LoadingModal from "./loadingModal";
import SuccessModal from "./successModel";

export const modalContent = {
  [ModalType.WALLET_ERROR]: {
    title: "",
    body: <ErrorModal />,
  },
  [ModalType.DELETE_TOKEN]: {
    title: "",
    body: <DeleteToken />,
  },
  [ModalType.LOADING]: {
    title: "",
    body: <LoadingModal />,
  },
  [ModalType.SUCCESS]: {
    title: "",
    body: <SuccessModal />,
  },
};
