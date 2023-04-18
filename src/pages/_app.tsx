import "@celo-tools/use-contractkit/lib/styles.css";
import "../styles/globals.css";

import { Provider } from "react-redux";
import { ContractKitProvider, Alfajores } from "@celo-tools/use-contractkit";
import { store } from "@/state";
import Navbar from "@/containers/nav";
import Modal from "@/containers/modal";
import Footer from "@/components/footer";
import PageHeader from "@/containers/pageHeader";
import ContractsProvider from "@/context/contractsContext";
import AppWrapper from "@/containers/AppWrapper";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";

const App = ({ Component, pageProps }) => {
  return (
    // <ContractKitProvider
    //   dapp={{
    //     name: "TokenKid",
    //     description: "NFT Marketplace",
    //     url: "https://tokenkid.netlify.app/",
    //     icon: "https://tokenkid.netlify.app/favicon.ico",
    //   }}
    //   network={Alfajores}
    // >
      <Provider store={store}>
        {/* <ContractsProvider> */}
          <ApolloProvider client={client}>
            <PageHeader />
            <div className="fixed top-0 inset-x-0 bg-opacity-50 z-20 backdrop-filter backdrop-blur-xl">
              <Navbar />
            </div>
            <AppWrapper>
              <div className="flex w-full flex-col sm:flex-row">
                <Component {...pageProps} />
              </div>
              <Footer />
              <Modal />
            </AppWrapper>
          </ApolloProvider>
        {/* </ContractsProvider> */}
      </Provider>
    // </ContractKitProvider>
  );
};

export default App;
