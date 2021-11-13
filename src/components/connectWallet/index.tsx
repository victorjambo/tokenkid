import Web3 from "web3";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useCallback, useEffect, useState } from "react";
import { StableToken } from "@celo/contractkit";
import { generateAddress } from "@/utils/generateAddress";
import { classNames } from "@/utils/classNames";
import { shortAddress } from "@/utils/shortAddress";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/state";
import { setAccountBalances } from "@/state/wallet/slice";
import GradientAvatar from "../avatar";

const ConnectWallet: React.FC = () => {
  const {
    address,
    account,
    connect,
    destroy,
    initialised,
    kit,
    network: { name },
    walletType,
  } = useContractKit();

  const dispatch = useDispatch();

  const {
    wallet: { accountBalances },
  } = useSelector((state: AppState) => state);

  const _address = generateAddress(account, address);

  const fetchAccountBalances = useCallback(async () => {
    if (!initialised || !account) return;
    const [celoToken, cusdToken, ceurToken] = await Promise.all([
      kit.contracts.getGoldToken(),
      kit.contracts.getStableToken(StableToken.cUSD),
      kit.contracts.getStableToken(StableToken.cEUR),
    ]);

    const [celo, cUSD, cEUR] = await Promise.all([
      celoToken.balanceOf(address),
      cusdToken.balanceOf(address),
      ceurToken.balanceOf(address),
    ]);

    dispatch(
      setAccountBalances({
        celo: Web3.utils.fromWei(celo.toFixed()),
        cUSD: Web3.utils.fromWei(cUSD.toFixed()),
        cEUR: Web3.utils.fromWei(cEUR.toFixed()),
      })
    );
  }, [address, kit]);

  useEffect(() => {
    void fetchAccountBalances();
  }, [fetchAccountBalances]);

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
                      destroy().catch((err) =>
                        console.log((err as Error).message)
                      );
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
