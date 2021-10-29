import GradientAvatar from "@/components/avatar";
import React from "react";

const Assets: React.FC = () => {
  return (
    <div className="container m-auto py-24 flex flex-row space-x-6">
      <div className="w-1/2 flex flex-col">
        <div className="mb-8">
          <img
            className="w-full rounded-xl"
            src="/images/home-one-img2.jpeg"
          />
        </div>
        
      </div>
      <div className="w-1/2 flex flex-col space-y-5">
        <div className="font-bold text-2xl">Description</div>
        <div className="text-gray-400">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks.</div>
        <div className="flex flex-row items-center space-x-2">
          <div className=" border-2 border-pink-primary rounded-full"><GradientAvatar /></div>
          <div className="flex flex-col">
            <div className="text-lg">Victor.eth</div>
            <div className="text-gray-400">Item Owner</div>
          </div>
        </div>

        <div className="flex flex-row justify-between bg-gray-state rounded-xl p-8">
          <div className="flex flex-col">
            <div className="text-sm text-gray-400">Auction Ends In</div>
            <div className="text-lg font-semibold">12:19:47:55</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-400">Highest Bid</div>
            <div className="text-lg font-semibold">15,00 ETH</div>
          </div>
        </div>

        <div className="bg-pink-primary rounded-full px-6 py-3 text-white text-center font-semibold">
          Place bid
        </div>

        <div className="bg-white-back py-9 px-5">
          <div className="text-black text-2xl font-bold pb-8">History</div>
          <div className="flex flex-col space-y-4">

            <div className="p-5 bg-white flex flex-row justify-between items-center">
              <div className="flex flex-row items-center space-x-3">
                <div className=" border-2 border-pink-primary rounded-full"><GradientAvatar /></div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Bid Placed For <span className="text-black">235 ETH</span></div>
                  <div className="text-pink-primary">@Jack</div>
                </div>
              </div>
              <div className="text-gray-400">4 Hours Ago</div>
            </div>

            <div className="p-5 bg-white flex flex-row justify-between items-center">
              <div className="flex flex-row items-center space-x-3">
                <div className=" border-2 border-pink-primary rounded-full"><GradientAvatar /></div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Bid Placed For <span className="text-black">235 ETH</span></div>
                  <div className="text-pink-primary">@Jack</div>
                </div>
              </div>
              <div className="text-gray-400">4 Hours Ago</div>
            </div>

            <div className="p-5 bg-white flex flex-row justify-between items-center">
              <div className="flex flex-row items-center space-x-3">
                <div className=" border-2 border-pink-primary rounded-full"><GradientAvatar /></div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Bid Placed For <span className="text-black">235 ETH</span></div>
                  <div className="text-pink-primary">@Jack</div>
                </div>
              </div>
              <div className="text-gray-400">4 Hours Ago</div>
            </div>

            <div className="p-5 bg-white flex flex-row justify-between items-center">
              <div className="flex flex-row items-center space-x-3">
                <div className=" border-2 border-pink-primary rounded-full"><GradientAvatar /></div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Bid Placed For <span className="text-black">235 ETH</span></div>
                  <div className="text-pink-primary">@Jack</div>
                </div>
              </div>
              <div className="text-gray-400">4 Hours Ago</div>
            </div>

            <div className="p-5 bg-white flex flex-row justify-between items-center">
              <div className="flex flex-row items-center space-x-3">
                <div className=" border-2 border-pink-primary rounded-full"><GradientAvatar /></div>
                <div className="flex flex-col">
                  <div className="text-gray-600">Bid Placed For <span className="text-black">235 ETH</span></div>
                  <div className="text-pink-primary">@Jack</div>
                </div>
              </div>
              <div className="text-gray-400">4 Hours Ago</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
