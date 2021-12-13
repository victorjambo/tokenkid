import Web3 from "web3";
import TokenKidFactoryContract from "@/contractClient/TokenKidFactory";
import { useContractKit } from "@celo-tools/use-contractkit";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch } from "react-redux";
import { StableToken } from "@celo/contractkit";
import { setAccountBalances } from "@/state/wallet/slice";
import { ITokenInfo } from "@/state/tokens/types";
import ERC20Contract from "@/contractClient/ERC20";
import { tokenAddresses } from "@/utils/tokenAddresses";

interface ContractsProviderProps {
  handleConnection: () => void;
  handleDestroy: () => void;
  tokenKidFactoryContract: TokenKidFactoryContract;
  ERC20: ERC20Contract;
  fetchMintedToken: (tokenId: number) => Promise<ITokenInfo>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  contractAddress: string;
}

const ContractsContext = createContext<Partial<ContractsProviderProps>>({});

export const useContractsContext = (): Partial<ContractsProviderProps> =>
  useContext(ContractsContext);

const ContractsProvider: React.FC = ({ children }) => {
  const {
    kit,
    connect,
    destroy,
    network: { name },
    walletType,
    getConnectedKit,
  } = useContractKit();

  const [loading, setLoading] = useState(false);
  const [tokenKidFactoryContract, setTokenKidFactoryContract] = useState(null);
  const [ERC20, setERC20] = useState(null);

  const contractAddress = tokenAddresses[name].tokenFactory;

  useEffect(() => {
    if (walletType !== "Unauthenticated") {
      // Initialize contracts
      setTokenKidFactoryContract(
        new TokenKidFactoryContract(name, getConnectedKit)
      );
      setERC20(new ERC20Contract(name, getConnectedKit));
    } else {
      setTokenKidFactoryContract(null);
      setERC20(null);
    }
  }, [walletType]);

  const dispatch = useDispatch();

  const fetchAccountBalances = useCallback(async () => {
    const { defaultAccount } = kit;
    if (!defaultAccount) return;
    const [celoToken, cusdToken, ceurToken] = await Promise.all([
      kit.contracts.getGoldToken(),
      kit.contracts.getStableToken(StableToken.cUSD),
      kit.contracts.getStableToken(StableToken.cEUR),
    ]);

    const [celo, cUSD, cEUR] = await Promise.all([
      celoToken.balanceOf(defaultAccount),
      cusdToken.balanceOf(defaultAccount),
      ceurToken.balanceOf(defaultAccount),
    ]);

    dispatch(
      setAccountBalances({
        celo: Web3.utils.fromWei(celo.toFixed()),
        cUSD: Web3.utils.fromWei(cUSD.toFixed()),
        cEUR: Web3.utils.fromWei(cEUR.toFixed()),
      })
    );
  }, [walletType]);

  useEffect(() => {
    void fetchAccountBalances();
  }, [fetchAccountBalances]);

  const handleConnection = () => {
    connect().catch((e) => console.log((e as Error).message));
  };

  const handleDestroy = () => {
    destroy().catch((err) => console.log((err as Error).message));
  };

  return (
    <ContractsContext.Provider
      value={{
        handleConnection,
        handleDestroy,
        tokenKidFactoryContract,
        ERC20,
        loading,
        setLoading,
        contractAddress,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsProvider;
