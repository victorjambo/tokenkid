import ERC20Contract from "@/contractClient/ERC20";
import TokenKidContract from "@/contractClient/TokenKidContract";
import { useAccount, useChainId } from "wagmi";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { TOKENS, IToken } from "@/utils/tokens";

interface ITokenInfo {
  tokenId: number;
  tokenName: string;
  owner: string;
  previousOwner: string;
  price: number;
  tokenURI: string;
  isOnSale: boolean;
  tokenDesc: string;
}

interface ITokenPriceHistory {
  tokenId: number;
  transferTime: number;
  from: number;
  to: number;
}

interface WalletProviderProps {
  tokenKidContract: TokenKidContract;
  ERC20: ERC20Contract;
  currentToken: IToken;
  tokeninfo: ITokenInfo | null;
  currentAllowance: string | number | null;
  fetchAllowance: () => Promise<void>;
  fetchMintedToken: (tokenId: number) => Promise<void>;
  loading: boolean;
  setTokeninfo: Dispatch<SetStateAction<ITokenInfo>>;
  setCurrentAllowance: Dispatch<SetStateAction<string | number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  approved: string;
  setApproved: Dispatch<SetStateAction<string>>;
  priceHistory: ITokenPriceHistory[] | null;
  setPriceHistory: (price: ITokenPriceHistory[]) => void;
}

const WalletContext = createContext<Partial<WalletProviderProps>>({});

export const useWalletContext = (): Partial<WalletProviderProps> =>
  useContext(WalletContext);

const WalletProvider: React.FC = ({ children }) => {
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const [tokenKidContract, setTokenKidContract] =
    useState<TokenKidContract | null>(null);
  const [ERC20, setERC20] = useState<ERC20Contract | null>(null);
  const [currentAllowance, setCurrentAllowance] = useState<
    string | number | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState("");
  const [priceHistory, setStatePriceHistory] = useState<
    ITokenPriceHistory[] | null
  >(null);

  const currentToken = useMemo(() => TOKENS[chainId || 5], [chainId]);

  useEffect(() => {
    if (isConnected && chainId) {
      setTokenKidContract(new TokenKidContract(currentToken?.contractAddress));
      setERC20(new ERC20Contract(currentToken?.ERC20Tokens?.address));
    } else {
      setTokenKidContract(null);
      setERC20(null);
    }
  }, [isConnected && chainId]);

  const setPriceHistory = (_priceHistory: ITokenPriceHistory[]) => {
    if (_priceHistory.length) {
      _priceHistory.sort((a, b) => (a.transferTime < b.transferTime ? 1 : -1));
    }
    setStatePriceHistory(_priceHistory);
  };

  return (
    <WalletContext.Provider
      value={{
        tokenKidContract,
        ERC20,
        currentToken,
        currentAllowance,
        loading,
        setCurrentAllowance,
        setLoading,
        approved,
        setApproved,
        priceHistory,
        setPriceHistory,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
