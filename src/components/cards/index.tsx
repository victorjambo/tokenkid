import { useQueryTokens } from "@/graphql/hooks";
import { useEffect, useState } from "react";
import Card from "./card";

const Cards: React.FC = () => {
  const { data, loading } = useQueryTokens();

  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    if (loading) return;
    setTokens(data.tokens);
  }, [loading]);

  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-10">
      {tokens &&
        tokens.map((token) => (
          <div className="group">
            <Card token={token} />
          </div>
        ))}
    </div>
  );
};

export default Cards;
