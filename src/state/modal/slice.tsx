import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ModalType {
  CONNECT_WALLET,
}

interface IModalState {
  isOpen: boolean;
  modalType: ModalType;
}

const initialState: IModalState = {
  isOpen: false,
  modalType: ModalType.CONNECT_WALLET,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpen = false;
    },
    openModal(state) {
      state.isOpen = true;
    },
    setModalType(state, action: PayloadAction<ModalType>) {
      state.modalType = action.payload;
    },
  },
});

export const { closeModal, openModal, setModalType } = modalSlice.actions;
export default modalSlice.reducer;
