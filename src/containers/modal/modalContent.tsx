import { ModalType } from "@/state/modal/slice";

export const modalContent = {
  [ModalType.CONNECT_WALLET]: {
    title: "Payment successful",
    body: (handleCloseModal: () => void) => (
      <>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Your payment has been successfully submitted. We’ve sent you an
            email with all of the details of your order.
          </p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            onClick={handleCloseModal}
          >
            Got it, thanks!
          </button>
        </div>
      </>
    ),
  },
};
