import { store, wrapper } from "@/state";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
