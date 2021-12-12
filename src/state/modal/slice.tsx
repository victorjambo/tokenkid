import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ModalType {
  WALLET_ERROR,
  DELETE_TOKEN,
  LOADING,
  SUCCESS,
}

interface IModalState {
  isOpen: boolean;
  modalType: ModalType;
}

const initialState: IModalState = {
  isOpen: false,
  modalType: ModalType.WALLET_ERROR,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal(state, action: PayloadAction<ModalType>) {
      state.modalType = action.payload ?? state.modalType;
      state.isOpen = false;
    },
    openModal(state, action: PayloadAction<ModalType>) {
      state.modalType = action.payload ?? state.modalType;
      state.isOpen = true;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
