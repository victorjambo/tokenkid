import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, SwitchVerticalIcon } from "@heroicons/react/solid";

const priceHistory = [
  { from: "10", to: "15", date: "4 hours ago" },
  { from: "5", to: "10", date: "4 hours ago" },
];

const PriceHistoryTable = () => {
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
                  <div>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            From
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            To
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {price.from}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {price.to}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {price.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
