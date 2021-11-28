import { Transition } from "@headlessui/react";
import StateIcon from "@/components/stateIcon";
import Alert from "@/components/alert";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface IProps {
  show: boolean;
  showAlert: boolean;
  setShowAlert: (arg: boolean) => void;
  txError: { message: string };
  states: {
    upload: {
      loading: boolean;
      done: boolean;
      error: boolean;
    };
    txHash: {
      loading: boolean;
      done: boolean;
      error: boolean;
    };
    mint: {
      loading: boolean;
      done: boolean;
      error: boolean;
    };
  };
  txHash: string;
}

const Activity: React.FC<IProps> = ({
  show,
  showAlert,
  setShowAlert,
  txError,
  states,
  txHash,
}) => {
  return (
    <Transition
      show={show}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full opacity-0"
    >
      <div className="flex flex-col whitespace-nowrap">
        <div className="text-3xl pb-4">&nbsp;</div>
        <div className="flex flex-col bg-white py-10 px-5 rounded-lg space-y-6">
          <div className="text-2xl">Activity</div>
          <Alert
            variant="error"
            closable={true}
            show={showAlert}
            setShow={setShowAlert}
          >
            {txError?.message}
          </Alert>
          <div className="flex flex-row items-center space-x-2">
            <StateIcon states={states.upload} />
            <span>
              {states.upload.loading ? "Uploading image " : "Image uploaded "}
              to <code>ipfs</code>
            </span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <StateIcon states={states.txHash} />
            <span>
              {states.txHash.loading
                ? "Approving Transaction "
                : "Transaction Approved "}
              {states.txHash.done && txHash && (
                <a
                  href={`https://alfajores-blockscout.celo-testnet.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Transaction
                </a>
              )}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <StateIcon states={states.mint} />
            <span>
              {states.mint.loading
                ? "Minting Token"
                : states.mint.done
                ? "Woohoo! Token Minted"
                : "Mint Token"}
            </span>
          </div>
          <div className="flex flex-row items-center text-blue-600 hover:text-blue-700 text-lg">
            <Link href="/assets">
              View Token <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Activity;
