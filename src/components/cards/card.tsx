import GradientAvatar from "@/components/avatar";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

const Card: React.FC = () => {
  return (
    <div className="">
      <div className="relative">
        <img className="w-full rounded-t-md" src="/images/home-one-img1.jpeg" />
        <div className="absolute bottom-5 left-5 right-5 p-3 border-1 border-white border-opacity-50 rounded-lg">
          <div className="absolute inset-0 backdrop-filter backdrop-blur-md rounded-lg" />
          <div className="flex flex-row font-medium">
            <div className="w-1/2 flex flex-col z-10">
              <div>Start Bid</div>
              <div>15,00 ETH</div>
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
            <div className="text-sm text-gray-400">Created by @Victor.eth</div>
          </div>
        </div>
        <ArrowCircleRightIcon className="w-8 h-8 text-pink-primary hover:text-blue-lightblue transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
      </div>
    </div>
  );
};

export default Card;
