import "@celo-tools/use-contractkit/lib/styles.css";
import "../styles/globals.css";

import { ContractKitProvider, NetworkNames } from "@celo-tools/use-contractkit";
import { store } from "@/state";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar";
import Modal from "@/containers/modal";

const App = ({ Component, pageProps }) => {
  return (
    <ContractKitProvider
      dapp={{
        name: "TokenKid",
        description: "NFT Marketplace",
        url: "https://use-contractkit.vercel.app",
        icon: "https://use-contractkit.vercel.app/favicon.ico",
      }}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
        explorer: "https://alfajores-blockscout.celo-testnet.org",
        chainId: 44787,
      }}
    >
      <Provider store={store}>
        <div className="fixed top-0 inset-x-0 bg-opacity-50 z-20 backdrop-filter backdrop-blur-xl">
          <Navbar />
        </div>
        <div className="flex w-full flex-col sm:flex-row py-24 z-20 justify-center items-center my-0 mx-auto">
          <Component {...pageProps} />
        </div>
        <Modal />
      </Provider>
    </ContractKitProvider>
  );
};

export default App;
