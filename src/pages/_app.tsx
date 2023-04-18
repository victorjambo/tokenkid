import "../styles/globals.css";

import { Provider } from "react-redux";
import { store } from "@/state";
import Navbar from "@/containers/nav";
import Modal from "@/containers/modal";
import Footer from "@/components/footer";
import PageHeader from "@/containers/pageHeader";
import AppWrapper from "@/containers/AppWrapper";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { createClient, WagmiConfig } from "wagmi";
import { getDefaultClient, ConnectKitProvider } from "connectkit";
import { mainnet, polygon, goerli, celoAlfajores } from "wagmi/chains";
import WalletProvider from "@/context/wallet";

const wagmiClient = createClient(
  getDefaultClient({
    appName: "TokenKid",
    alchemyId: "PykRvt7NeOYIUQny-SE8s_-fGjvG1B2P",
    chains: [mainnet, polygon, goerli, celoAlfajores],
  })
);

const App = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
        <Provider store={store}>
          <WalletProvider>
            <ApolloProvider client={client}>
              <PageHeader />
              <div className="fixed top-0 inset-x-0 bg-opacity-50 z-20 backdrop-filter backdrop-blur-xl">
                <Navbar />
              </div>
              <div className="flex w-full flex-col sm:flex-row">
                <Component {...pageProps} />
              </div>
              <Footer />
              <Modal />
            </ApolloProvider>
          </WalletProvider>
        </Provider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default App;
