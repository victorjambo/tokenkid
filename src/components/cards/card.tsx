import Link from "next/link";
import GradientAvatar from "@/components/avatar";

const Card: React.FC = () => {
  return (
    <div className="text-white popup-hover">
      <div className="relative">
        <Link href="/assets">
          <img
            className="w-full rounded-t-md cursor-pointer"
            src="/images/home-one-img2.jpeg"
          />
        </Link>
        <div className="absolute top-6 left-5 rounded-lg text-black">
          <div className="absolute inset-0 rounded-full bg-white" />
          <div className="flex flex-row font-medium py-2 pl-2 pr-4">
            <Link href="/profile">
              <div className="flex flex-row items-center w-full z-10 text-center space-x-2 cursor-pointer hover:text-pink-primary">
                <GradientAvatar />
                <div className="text-sm">Created by @Victor.eth</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 p-3 border-1 border-white border-opacity-50 rounded-lg">
          <div className="absolute inset-0 backdrop-filter backdrop-blur-md rounded-lg" />
          <div className="flex flex-row font-medium">
            <div className="w-full z-10 text-center">00:00:00:00</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white text-black p-4 rounded-b-md space-y-3">
        <div className="hover:text-pink-primary font-bold">
          <Link href="/assets">Love In The Air</Link>
        </div>
        <div className="flex flex-row border-1 rounded-md py-2 px-4 justify-between">
          <div>110 ETH 12/14</div>
          <div>Bid 70 ETH</div>
        </div>
        <div className="flex flex-wrap flex-row items-center space-x-2">
          <div className="flex flex-row">
            <GradientAvatar size="w-5 h-5" />
            <div className="border-1 rounded-full border-white -ml-2">
              <GradientAvatar size="w-5 h-5" />
            </div>
          </div>
          <div>10+ People Placed Bid</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
