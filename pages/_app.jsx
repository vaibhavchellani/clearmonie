import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, DAppProvider } from "@usedapp/core";
import Navbar from "../components/shared/Navbar";

const config = {
  readOnlyChainId: ChainId.Goerli,
  readOnlyUrls: {
    [ChainId.Goerli]:
      "https://eth-goerli.alchemyapi.io/v2/0CsCvN4k8MfRDtZSpcuH5F0m50l8XaNV",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
