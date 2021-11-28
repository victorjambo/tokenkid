import Web3 from "web3";
import TokenKidFactoryContract from "@/contracts/TokenKidFactory";
import { useContractKit } from "@celo-tools/use-contractkit";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StableToken } from "@celo/contractkit";
import { setAccountBalances } from "@/state/wallet/slice";

interface ContractsProviderProps {
  handleConnection: () => void;
  handleDestroy: () => void;
  tokenKidFactoryContract: TokenKidFactoryContract;
}

const ContractsContext = createContext<Partial<ContractsProviderProps>>({});

export const useContractsContext = (): Partial<ContractsProviderProps> =>
  useContext(ContractsContext);

const ContractsProvider: React.FC = ({ children }) => {
  const {
    address,
    account,
    connect,
    destroy,
    initialised,
    network: { name },
    walletType,
    getConnectedKit,
    performActions,
  } = useContractKit();

  const [tokenKidFactoryContract, setTokenKidFactoryContract] = useState(null);

  useEffect(() => {
    if (walletType !== "Unauthenticated") {
      // Initialize contracts
      setTokenKidFactoryContract(new TokenKidFactoryContract(name, getConnectedKit));
    } else {
      setTokenKidFactoryContract(null);
    }
  }, [walletType]);

  const dispatch = useDispatch();

  const fetchAccountBalances = useCallback(async () => {
    await performActions(async (kit) => {
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
    });
  }, []);

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
        tokenKidFactoryContract
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsProvider;
