import { openModal } from "@/state/modal/slice";
import { useDispatch } from "react-redux";

const ConnectWallet: React.FC = () => {
  const dispatch = useDispatch();

  const handleOpenWalletModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="flex-shrink-0">
      <button
        onClick={handleOpenWalletModal}
        type="button"
        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-primary shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-lightblue"
      >
        <img
          className="-ml-1 mr-2 h-5 w-5"
          src="/images/icons/wallet.svg"
          alt=""
        />
        <span>Connect Wallet</span>
      </button>
    </div>
  )
};

export default ConnectWallet;
