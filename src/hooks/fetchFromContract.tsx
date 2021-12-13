import { useContractsContext } from "@/context/contractsContext";
import TokenKidFactoryContract from "@/contractClient/TokenKidFactory";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import ERC20Contract from "@/contractClient/ERC20";
import {
  setApproved,
  setCurrentAllowance,
  setPriceHistory,
  setTokeninfo,
  setTokenNotFound,
} from "@/state/tokens/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/state";

export const fetchFromContract = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tokenId } = router.query;

  const {
    tokens: { tokeninfo, currentAllowance, approved, priceHistory },
  } = useSelector((state: AppState) => state);

  const { tokenKidFactoryContract, setLoading, ERC20 } = useContractsContext();

  const { performActions } = useContractKit();

  const fetchMintedToken = useCallback(async () => {
    setLoading(true);
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const token = await tokenKidFactoryContract.getMintedToken(+tokenId);

        if (token !== null) {
          dispatch(setTokeninfo(token));
        } else {
          dispatch(setTokenNotFound(true));
        }
        setLoading(false);
      }
    });
  }, [tokenKidFactoryContract, router.isReady]);

  const fetchAllowance = useCallback(async () => {
    if (ERC20 instanceof ERC20Contract) {
      const _currentAllowance = await ERC20.getAllowance();
      dispatch(setCurrentAllowance(_currentAllowance / 10 ** 18));
    }
  }, [ERC20]);

  const fetchApproved = useCallback(async () => {
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const _approved = await tokenKidFactoryContract.getApproved(+tokenId);
        dispatch(setApproved(_approved));
      }
    });
  }, [tokenKidFactoryContract, router.isReady]);

  const fetchTokenPriceHistory = useCallback(async () => {
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const tokenPriceHistory =
          await tokenKidFactoryContract.getTokenPriceHistory(+tokenId);
        if (tokenPriceHistory !== null) {
          dispatch(setPriceHistory(tokenPriceHistory));
        }
      }
    });
  }, [tokenKidFactoryContract, router.isReady]);

  useEffect(() => {
    void fetchMintedToken();
    void fetchAllowance();
    void fetchApproved();
  }, [fetchMintedToken, fetchAllowance, fetchApproved]);

  return {
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
