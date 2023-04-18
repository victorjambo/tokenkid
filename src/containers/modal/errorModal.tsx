import { useWalletContext } from "@/context/wallet";
import { AppState } from "@/state";
import { InformationCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { useSelector } from "react-redux";

const ErrorModal: React.FC = () => {
  const {
    wallet: { walletError, txHash },
  } = useSelector((state: AppState) => state);

  const {
    currentToken: {
      blockExplorer: {
        baseUrl,
        resources: { transaction },
      },
    },
  } = useWalletContext();

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <InformationCircleIcon className="w-20 h-20 text-rose-400" />
      <span className="text-xl">Oops!!! Something went wrong</span>
      {txHash && (
        <a
          href={`${baseUrl}/${transaction}/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          View Transaction
        </a>
      )}
      <span className="text-xs text-gray-400 text-ellipsis">
        {walletError.split("\n")[0]}
      </span>
    </div>
  );
};

export default ErrorModal;
