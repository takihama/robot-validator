import { ChakraProvider } from "@chakra-ui/react";

import "./index.css"
import PhoneNumberValidator from "./components/PhoneNumberValidator";

const App = () => {
  return (
    <ChakraProvider>
      <PhoneNumberValidator />
    </ChakraProvider>
  );
};

export default App;
