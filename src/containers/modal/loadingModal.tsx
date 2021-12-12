import Spinner from "@/components/spinner";
import { AppState } from "@/state";
import { useSelector } from "react-redux";

const LoadingModal: React.FC = () => {
  const {
    wallet: { txHash },
  } = useSelector((state: AppState) => state);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Spinner className="text-pink-primary animate-spin-slow w-28 h-28" />
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
  );
};

export default LoadingModal;
