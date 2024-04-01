import { useState } from "react";
import { Container, Divider, Heading, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { FormControl } from "@chakra-ui/form-control";
import { IoMdCheckmark, IoMdTrash } from "react-icons/io";

import { isCuitValid, getCuitDetails } from "../utils/cuitNumber";
import { csvFileToArray } from "../utils/csvFile";
import InputFile from "./atomic/InputFile";

const CuitNumberValidator = () => {
  const [cuitNumbers, setCuitNumbers] = useState([]);
  const [cuitDetailsList, setCuitDetailsList] = useState([]);

  const handleCuitFileChange = async (event) => {
    const cuits = await csvFileToArray(event.target.files[0]);
    validateCuitNumbers(cuits);
  };

  const handleCuitNumberChange = (event) => {
    // Assuming cuit numbers are separated by comma
    const numbers = event.target.value.split(/,/);
    setCuitNumbers(numbers);
  };

  const handleCuitNumberSubmit = (event) => {
    event.preventDefault();
    validateCuitNumbers();
  };

  const handleCuitNumberClear = (event) => {
    event.preventDefault();
    setCuitNumbers([]);
    setCuitDetailsList([]);
  };

  const handleInvalidCuitNumberClear = (event) => {
    event.preventDefault();
    setCuitNumbers([]);
    setCuitDetailsList(cuitDetailsList.filter((p) => p.status === "VALID"));
  };

  const validateCuitNumbers = (cuits) => {
    const updatedCuitDetailsList = [];

    (cuits || cuitNumbers).forEach((number) => {
      number = number.replace(/\s/g, "");
      if (isCuitValid(number)) {
        const cuitInfo = getCuitDetails(number);
        updatedCuitDetailsList.push({
          cuit: number,
          status: "VALID",
          ...cuitInfo,
        });
      } else if (!isNaN(number.replace(/-|\s/g, ""))) {
        updatedCuitDetailsList.push({ cuit: number, status: "INVALID" });
      }
    });

    const uniqueList = Array.from(
      new Set(
        [...cuitDetailsList, ...updatedCuitDetailsList].map(JSON.stringify)
      )
    ).map(JSON.parse);

    setCuitDetailsList(uniqueList);
  };

  return (
    <Container maxWidth="container.xl" height="100vh">
      <Stack paddingY="8">
        <Heading as="h1" size="lg" fontFamily="Dm Sans" paddingX="1">
          Validador de CUIT/CUIL
        </Heading>
        <FormControl>
          <Stack>
            <Textarea
              placeholder="Ingresa CUIT/CUIL separados por coma"
              value={cuitNumbers}
              onChange={handleCuitNumberChange}
            />
            <Stack
              direction="row"
              spacing={4}
              width="100%"
              wrap="wrap"
              justifyContent="center"
            >
              <Button
                minW="300px"
                type="submit"
                colorScheme="teal"
                leftIcon={<IoMdCheckmark />}
                onClick={handleCuitNumberSubmit}
              >
                Validar
              </Button>
              <InputFile handleInputFile={handleCuitFileChange} />
              <Button
                minW="300px"
                colorScheme="red"
                variant="outline"
                leftIcon={<IoMdTrash />}
                onClick={handleInvalidCuitNumberClear}
              >
                Limpiar inválidos
              </Button>
              <Button
                minW="300px"
                colorScheme="red"
                variant="outline"
                leftIcon={<IoMdTrash />}
                onClick={handleCuitNumberClear}
              >
                Limpiar todos
              </Button>
            </Stack>
          </Stack>
        </FormControl>
        <Divider paddingY="4" />
        <TableContainer justifyContent="center">
          <Table variant="simple" width="100%" backgroundColor="white">
            <Thead>
              <Tr>
                <Th>CUIT/CUIL</Th>
                <Th>Tipo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cuitDetailsList.map((cuitDetails, index) => (
                <Tr
                  key={index}
                  background={
                    cuitDetails.status === "VALID" ? "#DFEBE6" : "#FFE3F0"
                  }
                >
                  <Td>{cuitDetails.cuit}</Td>
                  <Td>{cuitDetails.type}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default CuitNumberValidator;
