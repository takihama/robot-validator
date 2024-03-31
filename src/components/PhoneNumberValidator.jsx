import { useState } from "react";
import {
  getAreaCodeDetails,
  isPhoneNumberValid,
  splitPhoneNumber,
} from "../utils/phoneNumber";
import { Container, Divider, Heading, Stack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import { IoMdCheckmark, IoMdTrash } from "react-icons/io";
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

const PhoneNumberValidator = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneDetailsList, setPhoneDetailsList] = useState([]);

  const handlePhoneChange = (event) => {
    // Assuming phone numbers are separated by comma
    const numbers = event.target.value.split(/,/);
    setPhoneNumbers(numbers);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    validatePhoneNumbers();
  };

  const handlePhoneClear = (event) => {
    event.preventDefault();
    setPhoneNumbers([]);
    setPhoneDetailsList([]);
  };

  const handleInvalidPhoneClear = (event) => {
    event.preventDefault();
    setPhoneNumbers([]);
    setPhoneDetailsList(phoneDetailsList.filter((p) => p.status === "VALID"));
  };

  const validatePhoneNumbers = () => {
    const updatedPhoneDetailsList = [];

    phoneNumbers.forEach((number) => {
      number = number.replace(/\s/g, "")
      if (isPhoneNumberValid(number)) {
        const phoneInfo = splitPhoneNumber(number);
        const areaInfo = getAreaCodeDetails(phoneInfo.areaCode);
        updatedPhoneDetailsList.push({
          phone: number,
          ...phoneInfo,
          ...areaInfo,
          status: "VALID",
        });
      } else if (!isNaN(number.replace(/-|\s/g, ""))) {
        updatedPhoneDetailsList.push({ phone: number, status: "INVALID" });
      }
    });

    const uniqueList = Array.from(
      new Set(
        [...phoneDetailsList, ...updatedPhoneDetailsList].map(JSON.stringify)
      )
    ).map(JSON.parse);

    setPhoneDetailsList(uniqueList);
  };

  return (
    <Container maxWidth="container.xl" height="100vh">
      <Stack paddingY="8">
        <Heading as="h1" size="lg" fontFamily="Dm Sans" paddingX="1">
          Validador de teléfonos argentinos
        </Heading>
        <FormControl>
          <Stack>
            <Textarea
              placeholder="Ingresa número(s) de teléfono separados por coma"
              value={phoneNumbers}
              onChange={handlePhoneChange}
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
                onClick={handlePhoneSubmit}
              >
                Validar
              </Button>
              <Button
                minW="300px"
                colorScheme="teal"
                variant="outline"
                leftIcon={<IoMdTrash />}
                onClick={handleInvalidPhoneClear}
              >
                Limpiar inválidos
              </Button>
              <Button
                minW="300px"
                colorScheme="teal"
                variant="outline"
                leftIcon={<IoMdTrash />}
                onClick={handlePhoneClear}
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
                <Th>Teléfono</Th>
                <Th>País</Th>
                <Th>Área</Th>
                <Th>Número</Th>
                <Th>Provincias</Th>
                <Th>Ciudades</Th>
              </Tr>
            </Thead>
            <Tbody>
              {phoneDetailsList.map((phoneDetails, index) => (
                <Tr
                  key={index}
                  background={
                    phoneDetails.status === "VALID" ? "#DFEBE6" : "#FFE3F0"
                  }
                >
                  <Td>{phoneDetails.phone}</Td>
                  <Td>{phoneDetails.countryCode}</Td>
                  <Td>{phoneDetails.areaCode}</Td>
                  <Td>{phoneDetails.number}</Td>
                  <Td>{(phoneDetails.provinces || []).join(", ")}</Td>
                  <Td>{(phoneDetails.cities || []).join(", ")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default PhoneNumberValidator;
