import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "../contexts";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
