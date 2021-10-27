import { ModalType } from "@/state/modal/slice";
import Placeholder from "../Placeholder";

export const modalContent = {
  [ModalType.WALLET_CONNECT]: {
    title: "",
    body: <Placeholder />,
  },
};
