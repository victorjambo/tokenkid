import Link from "next/link";
import GradientAvatar from "@/components/avatar";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

const Hero: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-transparent to-blue-dark pt-16 text-white">
      <div className="container mx-auto flex flex-row py-12 sm:py-24 items-center">
        <div className="w-1/2">
          <span className="text-lg text-pink-primary pb-3">
            Buying &amp; Selling NFT World
          </span>
          <div className="text-6xl pb-5">
            Discover, Collect, and Sell Extraordinary NFTs
          </div>
          <p className="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam
            etiam rhoncus aenean a iaculis aliquet rhoncus sed. Accumsan sit
            consequat, sodales consectetur. Egestas scelerisque ut dui sed nulla
            morbi quam eget luctus. In a vel morbi sed nisi.
          </p>
          <div className="flex flex-row space-x-5">
            <button className="px-6 py-3 rounded-lg transition duration-500 ease-in-out bg-pink-primary hover:bg-blue-lightblue transform hover:-translate-y-1 hover:scale-110">
              Explore
            </button>
            <Link href="/create">
              <span className="cursor-pointer px-6 py-3 rounded-lg hover:bg-pink-primary bg-blue-lightblue transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                Create
              </span>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex flex-row space-x-4">
          <div className="">
            <div className="relative">
              <img
                className="w-full rounded-t-md"
                src="/images/home-one-img1.jpeg"
              />
              <div className="absolute bottom-5 left-5 right-5 p-3 border-1 border-white border-opacity-50 rounded-lg">
                <div className="absolute inset-0 backdrop-filter backdrop-blur-md rounded-lg" />
                <div className="flex flex-row font-medium">
                  <div className="w-1/2 flex flex-col z-10">
                    <div>Start Bid</div>
                    <div>15.00 CELO</div>
                  </div>
                  <div className="w-1/2 flex flex-col z-10">
                    <div>Remaining Time</div>
                    <div>00:00:00:00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center bg-white text-black px-3 py-4 rounded-b-md">
              <div className="flex flex-row items-center">
                <GradientAvatar />
                <div className="flex flex-col pl-2">
                  <div className="font-bold">Flowers in Concrete</div>
                  <div className="text-sm text-gray-400">
                    Created by @Victor.eth
                  </div>
                </div>
              </div>
              <Link href="/assets">
                <span>
                  <ArrowCircleRightIcon className="cursor-pointer w-8 h-8 text-pink-primary hover:text-blue-lightblue transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <div className="relative">
              <img
                className="w-full rounded-t-md"
                src="/images/home-one-img2.jpeg"
              />
              <div className="absolute bottom-5 left-5 right-5 p-3 border-1 border-white border-opacity-50 rounded-lg">
                <div className="absolute inset-0 backdrop-filter backdrop-blur-md rounded-lg" />
                <div className="flex flex-row font-medium">
                  <div className="w-1/2 flex flex-col z-10">
                    <div>Start Bid</div>
                    <div>15.00 CELO</div>
                  </div>
                  <div className="w-1/2 flex flex-col z-10">
                    <div>Remaining Time</div>
                    <div>00:00:00:00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center bg-white text-black px-3 py-4 rounded-b-md">
              <div className="flex flex-row items-center">
                <GradientAvatar />
                <div className="flex flex-col pl-2">
                  <div className="font-bold">Flowers in Concrete</div>
                  <div className="text-sm text-gray-400">Created by @sam</div>
                </div>
              </div>
              <Link href="/assets">
                <span>
                  <ArrowCircleRightIcon className="cursor-pointer w-8 h-8 text-pink-primary hover:text-blue-lightblue transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
