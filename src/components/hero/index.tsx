import Link from "next/link";
import { MutableRefObject } from "react";
import HeroTokens from "./heroTokens";

const Hero: React.FC<{ assetRef: MutableRefObject<HTMLDivElement> }> = ({
  assetRef,
}) => {
  const handleExplore = () => {
    if (assetRef.current) {
      assetRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

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
            A non-fungible token (NFT) is a unique digital code that represents
            some kind of digital item. It could be digital art or music, for
            example. An NFT is secured and stored on a public blockchain.
          </p>
          <div className="flex flex-row space-x-5">
            <button
              className="px-6 py-3 rounded-lg transition duration-500 ease-in-out bg-pink-primary hover:bg-blue-lightblue transform hover:-translate-y-1 hover:scale-110"
              onClick={handleExplore}
            >
              Explore
            </button>
            <div className="cursor-pointer px-6 py-3 rounded-lg hover:bg-pink-primary bg-blue-lightblue transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              <Link href="/create">
                <span>Create</span>
              </Link>
            </div>
          </div>
        </div>
        <HeroTokens />
      </div>
    </div>
  );
};

export default Hero;
