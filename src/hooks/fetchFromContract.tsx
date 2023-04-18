import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ERC20Contract from "@/contractClient/ERC20";
import { fromWei } from "@/utils/weiConversions";
import { useAccount } from "wagmi";
import { useWalletContext } from "@/context/wallet";
import TokenKidContract from "@/contractClient/TokenKidContract";
import { getFirstOrString } from "@/utils/stringUtils";
import { ITokenInfo } from "@/state/tokens/types";

export const fetchFromContract = () => {
  const { address } = useAccount();
  const router = useRouter();
  const tokenId = getFirstOrString(router.query.tokenId);

  const [tokeninfo, setTokeninfo] = useState<ITokenInfo | null>(null);
  const [tokenNotFound, setTokenNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    setCurrentAllowance,
    tokenKidContract,
    ERC20,
    setApproved,
    setPriceHistory,
    currentAllowance,
    approved,
    priceHistory,
  } = useWalletContext();

  const fetchMintedToken = useCallback(async () => {
    setLoading(true);
    if (router.isReady && tokenKidContract instanceof TokenKidContract) {
      const token = await tokenKidContract.getMintedToken(+tokenId);

      if (token !== null) {
        setTokeninfo(token);
      } else {
        setTokenNotFound(true);
      }
      setLoading(false);
    }
  }, [tokenKidContract, router.isReady]);

  const fetchAllowance = useCallback(async () => {
    if (ERC20 instanceof ERC20Contract) {
      const _currentAllowance = await ERC20.getAllowance(address);
      setCurrentAllowance(fromWei(_currentAllowance));
    }
  }, [ERC20]);

  const fetchApproved = useCallback(async () => {
    if (router.isReady && tokenKidContract instanceof TokenKidContract) {
      const _approved = await tokenKidContract.getApproved(+tokenId);
      setApproved(_approved);
    }
  }, [tokenKidContract, router.isReady]);

  const fetchTokenPriceHistory = useCallback(async () => {
    if (router.isReady && tokenKidContract instanceof TokenKidContract) {
      const tokenPriceHistory = await tokenKidContract.getTokenPriceHistory(
        +tokenId
      );
      if (tokenPriceHistory !== null) {
        setPriceHistory(tokenPriceHistory);
      }
    }
  }, [tokenKidContract, router.isReady]);

  useEffect(() => {
    void fetchMintedToken();
    void fetchAllowance();
    void fetchApproved();
  }, [fetchMintedToken, fetchAllowance, fetchApproved]);

  return {
    loading,
    tokenNotFound,
    tokeninfo,
    currentAllowance,
    approved,
    fetchMintedToken,
    fetchAllowance,
    fetchApproved,
    fetchTokenPriceHistory,
    priceHistory,
  };
};
