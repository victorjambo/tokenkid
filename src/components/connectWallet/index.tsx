import GradientAvatar from "../avatar";
import { ConnectKitButton } from "connectkit";

const ConnectWallet: React.FC = () => {
  return (
    <div className="flex-shrink-0 flex flex-row space-x-4 items-center">
      <ConnectKitButton.Custom>
        {({ isConnected, show, truncatedAddress, ensName, address }) => {
          return (
            <button
              onClick={show}
              className={`${
                isConnected ? "" : "px-4 py-2"
              } relative inline-flex items-center border border-transparent text-sm font-medium rounded-full text-white bg-pink-primary shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-lightblue`}
            >
              {isConnected ? (
                <div className="flex flex-row items-center">
                  <GradientAvatar {...{ size: "w-10 h-10", address }} />
                  <span className="px-4">{ensName ?? truncatedAddress}</span>
                </div>
              ) : (
                <>
                  <img
                    className="-ml-1 mr-2 h-5 w-5"
                    src="/images/icons/wallet.svg"
                    alt=""
                  />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default ConnectWallet;
