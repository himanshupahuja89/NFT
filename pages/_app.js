import "../styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs";
export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
