import React from "react";
import GradientAvatar from "../avatar";

const TokenPriceHistory: React.FC = () => {
  return (
    <div className="bg-white-back py-9 px-5">
      <div className="text-black text-2xl font-bold pb-8">History</div>
      <div className="flex flex-col space-y-4">
        <div className="p-5 bg-white flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-3">
            <div className=" border-2 border-pink-primary rounded-full">
              <GradientAvatar />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-600">
                Bid Placed For <span className="text-black">235 CELO</span>
              </div>
              <div className="text-pink-primary">@Jack</div>
            </div>
          </div>
          <div className="text-gray-400">4 Hours Ago</div>
        </div>

        <div className="p-5 bg-white flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-3">
            <div className=" border-2 border-pink-primary rounded-full">
              <GradientAvatar />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-600">
                Bid Placed For <span className="text-black">235 CELO</span>
              </div>
              <div className="text-pink-primary">@Jack</div>
            </div>
          </div>
          <div className="text-gray-400">4 Hours Ago</div>
        </div>

        <div className="p-5 bg-white flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-3">
            <div className=" border-2 border-pink-primary rounded-full">
              <GradientAvatar />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-600">
                Bid Placed For <span className="text-black">235 CELO</span>
              </div>
              <div className="text-pink-primary">@Jack</div>
            </div>
          </div>
          <div className="text-gray-400">4 Hours Ago</div>
        </div>

        <div className="p-5 bg-white flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-3">
            <div className=" border-2 border-pink-primary rounded-full">
              <GradientAvatar />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-600">
                Bid Placed For <span className="text-black">235 CELO</span>
              </div>
              <div className="text-pink-primary">@Jack</div>
            </div>
          </div>
          <div className="text-gray-400">4 Hours Ago</div>
        </div>

        <div className="p-5 bg-white flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-3">
            <div className=" border-2 border-pink-primary rounded-full">
              <GradientAvatar />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-600">
                Bid Placed For <span className="text-black">235 CELO</span>
              </div>
              <div className="text-pink-primary">@Jack</div>
            </div>
          </div>
          <div className="text-gray-400">4 Hours Ago</div>
        </div>
      </div>
    </div>
  );
};

export default TokenPriceHistory;
