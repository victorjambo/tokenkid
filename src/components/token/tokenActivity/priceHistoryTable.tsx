import { useContractsContext } from "@/context/contractsContext";
import TokenKidFactoryContract from "@/contracts/TokenKidFactory";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  CollectionIcon,
  SwitchVerticalIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { humanizeTime } from "@/utils/humanizeTime";
import { fromWei } from "@/utils/weiConversions";

const PriceHistoryTable = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const { tokenKidFactoryContract } = useContractsContext();

  const { performActions } = useContractKit();

  const [priceHistory, setPriceHistory] = useState(null);

  const fetchTokenPriceHistory = useCallback(async () => {
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const tokenPriceHistory =
          await tokenKidFactoryContract.getTokenPriceHistory(+tokenId);
        if (tokenPriceHistory !== null) {
          setPriceHistory(tokenPriceHistory);
        }
      }
    });
  }, [tokenKidFactoryContract, router.isReady]);

  useEffect(() => {
    void fetchTokenPriceHistory();
  }, [fetchTokenPriceHistory]);

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <Disclosure.Button className="flex flex-row justify-between w-full py-3 text-lg font-semibold px-3 items-center bg-white border-b-1">
            <div className="flex flex-row space-x-2 items-center">
              <SwitchVerticalIcon className="w-6 h-6" />
              <span>Price History</span>
            </div>
            <ChevronDownIcon
              className={`${open ? "transform rotate-180" : ""} w-6 h-6`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  {priceHistory !== null ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {["From", "To", "Date"].map((header) => (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {priceHistory.map((price, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {fromWei(price.from)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {fromWei(price.to)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {humanizeTime(price.transferTime)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 bg-blue-lightblue bg-opacity-10">
                      <CollectionIcon className="w-14 h-14 text-pink-primary opacity-75" />
                      <div>No history yet</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default PriceHistoryTable;
