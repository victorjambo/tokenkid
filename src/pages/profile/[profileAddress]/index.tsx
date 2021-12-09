import GradientAvatar from "@/components/avatar";
import { useQueryAccountTokens } from "@/graphql/hooks";
import { shortAddress } from "@/utils/shortAddress";
import { CollectionIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "@/components/cards/card";
import Spinner from "@/components/spinner";

const Profile: React.FC = () => {
  const router = useRouter();
  const { profileAddress } = router.query;

  const { data, loading } = useQueryAccountTokens(profileAddress as string);

  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    if (loading) return;
    setTokens(data.tokens);
  }, [loading]);

  return (
    <div className="py-24 w-full">
      <div className="flex flex-col">
        <div className="flex flex-row container mx-auto pb-4">
          <div className="w-1/5" />
          <div className="w-4/5 px-10">
            <h1 className="text-4xl">Assets</h1>
          </div>
        </div>
        <div className="flex flex-row container mx-auto">
          <div className="w-1/5 sticky top-24 h-full">
            <div className="h-60 border rounded-lg">
              <div className="h-1/2 rounded-t-lg bg-gradient-to-b from-pink-primary border-b-1" />
              <div className="flex justify-center -mt-10">
                <GradientAvatar
                  size="w-20 h-20 ring-2 ring-pink-primary border border-white"
                  address={profileAddress as string}
                />
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://alfajores-blockscout.celo-testnet.org/address/${
                  profileAddress as string
                }`}
              >
                <div className="flex justify-center items-center cursor-pointer mt-5 text-green-400 hover:text-green-600">
                  <span>{shortAddress(profileAddress as string)}</span>
                  <ExternalLinkIcon className="w-5 h-5" />
                </div>
              </a>
              <div className="text-center text-gray-400">
                No of Assets: {tokens?.length}
              </div>
            </div>
          </div>
          <div className="w-4/5">
            <div className="ml-5 px-5 pt-5 pb-20 rounded-2xl bg-blue-lightblue bg-opacity-10">
              {tokens && tokens?.length ? (
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {tokens.map((token, idx) => (
                    <div className="group" key={idx}>
                      <Card token={token} showCreator={false} />
                    </div>
                  ))}
                </div>
              ) : loading ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <Spinner className="text-pink-primary animate-spin-slow w-28 h-28" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <CollectionIcon className="w-14 h-14 text-pink-primary opacity-75" />
                  <div>No Assets</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
