import ERC20Contract from "@/contractClient/ERC20";
import TokenKidContract from "@/contractClient/TokenKidContract";
import { ITokenInfo, ITokenPriceHistory } from "@/state/tokens/types";
import { SUPPORTED_CHAIN_IDS } from "@/utils/constants";
import { TOKENS } from "@/utils/tokens";
import { fromWei } from "@/utils/weiConversions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

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

  return { approved, fetchApproved };
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
      } else {
        const _token = await TokenKidContract.getMintedTokenWithProvider(
          +tokenId,
          currentToken?.contractAddress
        );
        setMintedToken(_token);
      }
    }
  }, [tokenId]);

  useEffect(() => {
    void fetchMintedToken();
  }, [fetchMintedToken]);

  return { mintedToken, fetchMintedToken };
};

export const useTokenPriceHistory = (tokenId: string, chain: string) => {
  const [priceHistory, setPriceHistory] = useState<ITokenPriceHistory[] | null>(
    null
  );

  const currentToken = useMemo(() => {
    let chainId = 5;
    if ((SUPPORTED_CHAIN_IDS as number[]).includes(+chain)) {
      chainId = +chain;
    }
    return TOKENS[chainId || 5];
  }, [chain]);

  const fetchTokenPriceHistory = useCallback(async () => {
    if (!tokenId) return;
    const tokenKidContract = new TokenKidContract(
      currentToken?.contractAddress
    );
    if (tokenKidContract instanceof TokenKidContract) {
      const tokenPriceHistory = await tokenKidContract.getTokenPriceHistory(
        +tokenId
      );
      if (tokenPriceHistory !== null) {
        setPriceHistory(tokenPriceHistory);
      }
    }
  }, [tokenId]);
  useEffect(() => {
    void fetchTokenPriceHistory();
  }, [fetchTokenPriceHistory]);

  return { priceHistory, fetchTokenPriceHistory };
};

export const useCurrentAllowance = (tokenId: string, chain: string) => {
  const { address } = useAccount();
  const [currentAllowance, setCurrentAllowance] = useState<string | number>(
    null
  );

  const currentToken = useMemo(() => {
    let chainId = 5;
    if ((SUPPORTED_CHAIN_IDS as number[]).includes(+chain)) {
      chainId = +chain;
    }
    return TOKENS[chainId || 5];
  }, [chain]);

  const fetchAllowance = useCallback(async () => {
    if (!tokenId) return;
    const ERC20 = new ERC20Contract(currentToken?.ERC20Tokens?.address);

    if (ERC20 instanceof ERC20Contract) {
      const _currentAllowance = await ERC20.getAllowance(address);
      setCurrentAllowance(fromWei(_currentAllowance));
    }
  }, [tokenId]);

  useEffect(() => {
    void fetchAllowance();
  }, [fetchAllowance]);

  return { currentAllowance, fetchAllowance };
};
