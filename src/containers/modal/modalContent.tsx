import { ModalType } from "@/state/modal/slice";
import Placeholder from "../Placeholder";
import DeleteToken from "./deleteToken";

export const modalContent = {
  [ModalType.WALLET_CONNECT]: {
    title: "",
    body: <Placeholder />,
  },
  [ModalType.DELETE_TOKEN]: {
    title: "",
    body: <DeleteToken />,
  },
};
