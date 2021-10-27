import {
  useContractKit,
} from "@celo-tools/use-contractkit";

const ConnectWallet: React.FC = () => {
  const {
    address,
    connect,
    destroy,
  } = useContractKit();

  const handleConnection = () => {
    const func = address ? destroy : connect;
    func().catch((e) => console.log((e as Error).message));
  };

  return (
    <div className="flex-shrink-0">
      <button
        onClick={handleConnection}
        type="button"
        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-primary shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-lightblue"
      >
        {address ? (
          <span>{address.slice(0,6)}...{address.slice(-4)}</span>
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
    </div>
  );
};

export default ConnectWallet;
