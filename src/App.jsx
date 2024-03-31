import countapi from 'countapi-js';
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css"
import PhoneNumberValidator from "./components/PhoneNumberValidator";

const App = () => {
  countapi.visits('global').then((result) => {
    console.log("hi");
    console.log(result.value);
  });

  return (
    <ChakraProvider>
      <PhoneNumberValidator />
    </ChakraProvider>
  );
};

export default App;
