import TokenKidContract from "@/contractClient/TokenKidContract";
import { ITokenInfo } from "@/state/tokens/types";
import { SUPPORTED_CHAIN_IDS } from "@/utils/constants";
import { TOKENS } from "@/utils/tokenAddresses";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useTokenApproved = (tokenId: string, chain: string) => {
  const [approved, setApproved] = useState<string | null>(null);

  const currentToken = useMemo(() => {
    let chainId = 5;
    if ((SUPPORTED_CHAIN_IDS as number[]).includes(+chain)) {
      chainId = +chain;
    }
    return TOKENS[chainId || 5];
  }, [chain]);

  const fetchApproved = useCallback(async () => {
    if (!tokenId) return;
    const tokenKidContract = new TokenKidContract(
      currentToken?.contractAddress
    );
    if (tokenKidContract instanceof TokenKidContract) {
      const _approved = await tokenKidContract.getApproved(+tokenId);
      setApproved(_approved);
    }
  }, [tokenId]);

  useEffect(() => {
    void fetchApproved();
  }, [fetchApproved]);

  return approved;
};

export const useMintedToken = (tokenId: string, chain: string) => {
  const [mintedToken, setMintedToken] = useState<ITokenInfo | null>(null);

  const currentToken = useMemo(() => {
    let chainId = 5;
    if ((SUPPORTED_CHAIN_IDS as number[]).includes(+chain)) {
      chainId = +chain;
    }
    return TOKENS[chainId || 5];
  }, [chain]);

  const fetchMintedToken = useCallback(async () => {
    if (!tokenId) return;
    const tokenKidContract = new TokenKidContract(
      currentToken?.contractAddress
    );

    if (tokenKidContract instanceof TokenKidContract) {
      const token = await tokenKidContract.getMintedToken(+tokenId);

      if (token !== null) {
        setMintedToken(token);
      }
    }
  }, [tokenId]);

  useEffect(() => {
    void fetchMintedToken();
  }, [fetchMintedToken]);

  return mintedToken;
};
