import Link from "next/link";
import GradientAvatar from "@/components/avatar";
import { shortAddress } from "@/utils/shortAddress";
import { fromWei } from "@/utils/weiConversions";
import ImageRender from "@/containers/placeholders/image";

interface ICards {
  token: {
    id: string;
    owner: string;
    tokenId: string;
    _price: string;
    _tokenName: string;
    _tokenURI: string;
  };
  showCreator?: boolean;
}

const Card: React.FC<ICards> = ({ token, showCreator = true }) => {
  return (
    <div className="text-white popup-hover">
      <div className="relative">
        <Link href={`/assets/${token.id}`}>
          <span>
            <ImageRender src={token._tokenURI} />
          </span>
        </Link>
        {showCreator && (
          <div className="absolute top-6 left-5 rounded-lg text-black">
            <div className="absolute inset-0 rounded-full bg-white" />
            <div className="flex flex-row font-medium py-2 pl-2 pr-4">
              <Link href={`/profile/${token.owner}`}>
                <div className="flex flex-row items-center w-full z-10 text-center space-x-2 cursor-pointer hover:text-pink-primary">
                  <GradientAvatar address={token.owner} />
                  <div className="text-sm">
                    <span className="text-gray-500">Created by</span>{" "}
                    {shortAddress(token.owner)}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between bg-white text-black p-4 rounded-b-md space-y-3">
        <div className="flex flex-row border-1 rounded-md py-2 px-4 justify-between">
          <div className="hover:text-pink-primary font-bold">
            <Link href={`/assets/${token.id}`}>{token._tokenName}</Link>
          </div>
          <div>{fromWei(token._price)} cUSD</div>
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
