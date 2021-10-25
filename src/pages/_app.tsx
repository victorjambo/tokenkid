import "../styles/globals.css";

import { store } from "@/state";
import { Provider } from "react-redux";
import Navbar from "@/components/Navbar";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <div className="fixed top-0 inset-x-0 bg-opacity-50 z-20 backdrop-filter backdrop-blur-xl">
        <Navbar />
      </div>
      <div className="flex w-full flex-col sm:flex-row py-24 z-20 justify-center items-center my-0 mx-auto">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default App;
