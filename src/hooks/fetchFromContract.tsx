import { useContractsContext } from "@/context/contractsContext";
import TokenKidFactoryContract from "@/contractClient/TokenKidFactory";
import { ITokenKid } from "@/state/wallet/types";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ERC20Contract from "@/contractClient/ERC20";
import { defaultTokenInfo, setTokenNotFound } from "@/state/tokens/slice";
import { useDispatch } from "react-redux";

export const fetchFromContract = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tokenId } = router.query;

  const [tokeninfo, setTokeninfo] = useState<ITokenKid>(defaultTokenInfo);
  const [currentAllowance, setCurrentAllowance] = useState(null);
  const [approved, setApproved] = useState(null);

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
          setTokeninfo(token);
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
      setCurrentAllowance(_currentAllowance / 10 ** 18);
    }
  }, [ERC20]);

  const fetchApproved = useCallback(async () => {
    await performActions(async () => {
      if (
        router.isReady &&
        tokenKidFactoryContract instanceof TokenKidFactoryContract
      ) {
        const _approved = await tokenKidFactoryContract.getApproved(+tokenId);
        setApproved(_approved);
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
  };
};
