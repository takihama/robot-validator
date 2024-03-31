import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react"

import "./index.css"
import PhoneNumberValidator from "./components/PhoneNumberValidator";

const App = () => {
  return (
    <ChakraProvider>
      <PhoneNumberValidator />
      <Analytics />
    </ChakraProvider>
  );
};

export default App;
