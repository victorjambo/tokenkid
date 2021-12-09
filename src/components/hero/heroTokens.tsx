import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import GradientAvatar from "../avatar";
import Link from "next/link";
import { shortAddress } from "@/utils/shortAddress";
import { useSelector } from "react-redux";
import { AppState } from "@/state";
import ImageRender from "@/containers/placeholders/image";

const HeroTokens: React.FC = () => {
  const {tokens: {tokens}} = useSelector((state: AppState) => state);

  return (
    <div className="w-1/2 flex flex-row space-x-4">
      {tokens.map((token, idx) => (
        <div className={idx === 1 ? "mt-10" : ""}>
          <div className="relative">
            <ImageRender src={token._tokenURI} />
          </div>
          <div className="flex flex-row justify-between items-center bg-white text-black px-3 py-4 rounded-b-md">
            <div className="flex flex-row items-center">
              <GradientAvatar />
              <div className="flex flex-col pl-2">
                <div className="font-bold">{token._tokenName}</div>
                <div className="text-sm text-gray-400">
                  Created by {shortAddress(token.owner)}
                </div>
              </div>
            </div>
            <Link href={`/assets/${token.id}`}>
              <span>
                <ArrowCircleRightIcon className="cursor-pointer w-8 h-8 text-pink-primary hover:text-blue-lightblue transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" />
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroTokens;
