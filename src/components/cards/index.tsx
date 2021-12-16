import { useQueryTokens } from "@/graphql/hooks";
import { setHeroTokens } from "@/state/tokens/slice";
import { ITokenGraph } from "@/state/tokens/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../spinner";
import Card from "./card";

const Cards: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading } = useQueryTokens();

  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    if (loading || !data) return;
    setTokens(data.tokens);
    dispatch(setHeroTokens(data.tokens));
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center pt-16">
          <Spinner className="text-pink-primary animate-spin-slow w-28 h-28" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-10">
          {tokens &&
            tokens.map((token: ITokenGraph, idx: number) => (
              <div className="group" key={idx}>
                <Card token={token} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Cards;
