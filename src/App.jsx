import {
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

import "./index.css";
import PhoneNumberValidator from "./components/PhoneNumberValidator";
import CuitNumberValidator from "./components/CuitNumberValidator";

const App = () => {
  return (
    <ChakraProvider>
      <Tabs>
        <TabList>
          <Tab>Teléfono</Tab>
          <Tab>CUIT/CUIL</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PhoneNumberValidator />
          </TabPanel>
          <TabPanel>
            <CuitNumberValidator />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Analytics />
    </ChakraProvider>
  );
};

export default App;
