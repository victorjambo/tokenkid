import { GraphToken } from "@/types";
import { SUPPORTED_CHAIN_IDS } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

export const useQueryTokens = () => {
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

export const useQueryAccountTokens = (profileAddress: string) => {
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

export const useQueryToken = (tokenId: string, chain: string) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<GraphToken>(null);

  const fetchToken = useCallback(async () => {
    if (!tokenId) return;
    setLoading(true);

    let chainId = "5";
    if (chain && (SUPPORTED_CHAIN_IDS as number[]).includes(+chain)) {
      chainId = chain;
    }

    await fetch(`/api/token/${tokenId}?chain=${chainId}`)
      .then((res) => res.json())
      .then((_token: GraphToken) => {
        setLoading(false);
        if ((_token as any)?.error) {
          setError(ErrorMessages.TOKEN_NOT_FOUND);
        } else {
          setToken(_token);
          setError(ErrorMessages.Default);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(ErrorMessages.TOKEN_NOT_FOUND);
      });
  }, [tokenId]);

  useEffect(() => {
    void fetchToken();
  }, [fetchToken]);

  return { token, loading, error };
};

const ErrorMessages = {
  Default: "",
  TOKEN_NOT_FOUND: "Token Not Found",
};
