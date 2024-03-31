import { useState } from "react";
import {
  getAreaCodeDetails,
  isPhoneNumberValid,
  splitPhoneNumber,
} from "../utils/phoneNumber";
import { Container, Heading, Stack } from "@chakra-ui/layout";
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
    // Assuming phone numbers are separated by comma or space
    const numbers = event.target.value.split(/[\s,]+/);
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

  const validatePhoneNumbers = () => {
    const updatedPhoneDetailsList = [];

    phoneNumbers.forEach((number) => {
      if (isPhoneNumberValid(number)) {
        const phoneInfo = splitPhoneNumber(number);
        const areaInfo = getAreaCodeDetails(phoneInfo.areaCode);
        updatedPhoneDetailsList.push({
          phone: number,
          ...phoneInfo,
          ...areaInfo,
          status: "VALID",
        });
      } else if (!isNaN(number.replace(/-|\s/g,''))) {
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
    <Container maxWidth="container.xl">
      <Container maxWidth="container.xl" height="100vh">
        <Stack paddingY="8" paddingX="4">
          <Heading
            as="h1"
            size="lg"
            noOfLines={1}
            justifyContent="center"
            fontFamily="Dm Sans"
          >
            Validador de teléfonos argentinos
          </Heading>
          <FormControl>
            <Stack>
              <Textarea
                className="phone-input"
                placeholder="Ingresa número(s) de teléfono separados por espacio o coma"
                value={phoneNumbers}
                onChange={handlePhoneChange}
              />
              <Stack direction="row" width="100%" justifyContent="right">
                <Button
                  type="submit"
                  colorScheme="teal"
                  leftIcon={<IoMdCheckmark />}
                  onClick={handlePhoneSubmit}
                >
                  Validar
                </Button>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  leftIcon={<IoMdTrash />}
                  onClick={handlePhoneClear}
                >
                  Limpiar
                </Button>
              </Stack>
            </Stack>
          </FormControl>
          <TableContainer justifyContent="center" paddingY="8">
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
                      phoneDetails.status === "VALID" ? "#5cb85c" : "#e57373"
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
    </Container>
  );
};

export default PhoneNumberValidator;
