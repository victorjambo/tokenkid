import { useContractKit } from "@celo-tools/use-contractkit";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useEffect } from "react";
import GradientAvatar from "../avatar";

enum StableToken {
  cUSD = "cUSD",
  cEUR = "cEUR"
}

const shortAddress = (address: string) => {
  if (!address) return;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
}

const ConnectWallet: React.FC = () => {
  const { address, account, connect, destroy, initialised, kit } = useContractKit();

  const _address = account ? {
    address
  } : {
    t: false
  }
  
  const handleConnection = () => {
    connect().catch((e) => console.log((e as Error).message));
  };

  return (
    <div className="flex-shrink-0 flex flex-row space-x-4 items-center">
      <button
        onClick={handleConnection}
        type="button"
        className={`${
          account ? "" : "px-4 py-2"
        } relative inline-flex items-center border border-transparent text-sm font-medium rounded-full text-white bg-pink-primary shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-lightblue`}
      >
        {initialised && account ? (
          <div className="flex flex-row items-center">
            <GradientAvatar {...{ size: "w-10 h-10", ..._address }} />
            <span className="px-4">{shortAddress(address)}</span>
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

      <Menu as="div" className="relative">
        <div>
          <Menu.Button className={`${(initialised && account) ? "" : "hidden"} flex text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-lightblue`}>
            <ChevronDownIcon className="rounded-full w-8 h-8 text-pink-primary" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "py-4 px-4 text-sm flex flex-row items-center space-x-2 text-gray-700"
                  )}
                >
                  <GradientAvatar {...{ size: "w-10 h-10", ..._address }} />
                  <span className="">{shortAddress(address)}</span>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const accounts = await kit.contracts.getAccounts();
                    const acs = await accounts.getAccountSummary(address);
                    const cUSD = await kit.contracts.getStableToken();
                    console.log({acs, cUSD});
                  }}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "w-full text-left block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      destroy().catch((err) => console.log((err as Error).message))
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "w-full block px-4 py-2 text-sm text-gray-700 text-left"
                    )}
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ConnectWallet;
