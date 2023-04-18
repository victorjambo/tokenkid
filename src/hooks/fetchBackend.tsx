// const { data, loading } = useQueryTokens();

import { GraphToken } from "@/api/subgraph";
import { useCallback, useEffect, useState } from "react";

export const useQueryTokensV2 = () => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<GraphToken[]>([]);

  const fetchTokens = useCallback(async () => {
    setLoading(true);

    await fetch("/api/tokens")
      .then((res) => res.json())
      .then((_tokens: GraphToken[]) => {
        setLoading(false);
        setTokens(_tokens);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    
  }, []);

  useEffect(() => {
    void fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading };
};

export const useQueryAccountTokensV2 = (profileAddress: string) => {
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState<GraphToken[]>([]);

  const fetchTokens = useCallback(async () => {
    if (!profileAddress) return;

    setLoading(true);

    await fetch(`/api/tokens/${profileAddress}`)
      .then((res) => res.json())
      .then((_tokens: GraphToken[]) => {
        setLoading(false);
        setTokens(_tokens);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    
  }, []);

  useEffect(() => {
    void fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading };
};
