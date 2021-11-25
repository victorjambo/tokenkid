import { useContractKit } from "@celo-tools/use-contractkit";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { generateAddress } from "@/utils/generateAddress";
import { classNames } from "@/utils/classNames";
import { shortAddress } from "@/utils/shortAddress";
import { useSelector } from "react-redux";
import { AppState } from "@/state";
import GradientAvatar from "../avatar";
import { useContractsContext } from "@/context/contractsContext";
import BN from "bn.js";

const ConnectWallet: React.FC = () => {
  const {
    address,
    account,
    initialised,
    network: { name },
    walletType,
    getConnectedKit
  } = useContractKit();

  const kit = getConnectedKit()

  const { handleConnection, handleDestroy, tokenKidFactoryContract } = useContractsContext();

  const {
    wallet: { accountBalances },
  } = useSelector((state: AppState) => state);

  const _address = generateAddress(account, address);

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
          <Menu.Button
            className={`${
              initialised && account ? "" : "hidden"
            } flex text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-lightblue`}
          >
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
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="py-4 px-4 space-y-2">
                <div className="text-sm flex flex-row items-center space-x-2 text-gray-700">
                  <GradientAvatar {...{ size: "w-5 h-5", ..._address }} />
                  <span className="">{shortAddress(address)}</span>
                </div>
                <div className="text-lg text-blue-lightblue">
                  <span className="text-xs text-gray-500">CELO:</span>{" "}
                  {accountBalances.celo}
                </div>
                <div className="text-lg text-blue-lightblue">
                  <span className="text-xs text-gray-500">cUSD:</span>{" "}
                  {accountBalances.cUSD}
                </div>
                <div className="text-lg text-blue-lightblue">
                  <span className="text-xs text-gray-500">cEUR:</span>{" "}
                  {accountBalances.cEUR}
                </div>
                <div className="text-sm text-blue-lightblue">
                  <span className="text-xs text-gray-500">Network:</span> {name}
                </div>
                <div className="text-sm text-blue-lightblue">
                  <span className="text-xs text-gray-500">Wallet:</span>{" "}
                  {walletType}
                </div>
              </div>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const price = new BN((2000000000000000000).toString())
                      tokenKidFactoryContract.safeMint("Test", price, "http://google.com/", kit.defaultAccount)
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "w-full block px-4 py-2 text-sm text-gray-700 text-left"
                    )}
                  >
                    SafeMint
                  </button>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const price = new BN((9000000000000000000).toString());
                      // tokenKidFactoryContract.changeTokenPrice(0, price, kit.defaultAccount);
                      // tokenKidFactoryContract.toggleOnSale(0, kit.defaultAccount);
                      // Try setting allowance first
                      // tokenKidFactoryContract.buyToken(0, price, "0x874069fa1eb16d44d622f2e0ca25eea172369bc1", kit.defaultAccount);
                      const token = await tokenKidFactoryContract.getMintedToken(0);
                      console.log({token});
                    }}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "w-full block px-4 py-2 text-sm text-gray-700 text-left"
                    )}
                  >
                    CLICKME
                  </button>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDestroy();
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
