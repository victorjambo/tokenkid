import { AppState } from "@/state";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

const SuccessModal: React.FC = () => {
  const {
    wallet: { txHash },
  } = useSelector((state: AppState) => state);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <CheckCircleIcon className="text-green-500 w-28 h-28" />
      {txHash && (
        <a
          href={`https://alfajores-blockscout.celo-testnet.org/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          View Transaction
        </a>
      )}
    </div>
  )
};

export default SuccessModal;
