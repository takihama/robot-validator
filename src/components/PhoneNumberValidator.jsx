import { useState } from "react";
import {
  getAreaCodeDetails,
  isPhoneNumberValid,
  splitPhoneNumber,
} from "../utils/phoneNumber";
import "./PhoneNumberValidator.css";

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
      } else {
        updatedPhoneDetailsList.push({ phone: number, status: "INVALID" });
      }
    });

    const uniqueList = Array.from(new Set([...phoneDetailsList, ...updatedPhoneDetailsList].map(JSON.stringify))).map(JSON.parse);

    setPhoneDetailsList(uniqueList);
  };

  const renderCities = (cities) => {
    if (!cities) return <></>;
    const maxCitiesToShow = 3; // Número máximo de ciudades a mostrar antes de recurrir a un tooltip

    if (cities.length <= maxCitiesToShow) {
      return cities.join(", ");
    } else {
      const visibleCities = cities.slice(0, maxCitiesToShow).join(", ");
      const hiddenCities = cities.slice(maxCitiesToShow).join(", ");
      return (
        <>
          {visibleCities}{" "}
          <span data-toggle="tooltip" title={hiddenCities}>
            ...
          </span>
        </>
      );
    }
  };

  return (
    <div className="phone-validator-container">
      <div className="phone-input-section">
        <h1 className="title">Ingresar Números de Teléfono</h1>
        <form onSubmit={handlePhoneSubmit}>
          <textarea
            className="phone-input"
            placeholder="Ingresa número(s) de teléfono separados por espacio o coma"
            value={phoneNumbers}
            onChange={handlePhoneChange}
          />
          <button className="submit-button" type="submit">Validar</button>
          <button className="reset-button" onClick={handlePhoneClear}>Limpiar</button>
        </form>
      </div>
      <div className="phone-details-section">
        <h1 className="title">Detalles de Validación</h1>
        {phoneDetailsList.length > 0 && (
          <div className="phone-info">
            <table>
              <thead>
                <tr>
                  <th>Teléfono</th>
                  <th>País</th>
                  <th>Área</th>
                  <th>Número</th>
                  <th>Provincia</th>
                  <th>Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {phoneDetailsList.map((phoneDetails, index) => (
                  <tr key={index} className={`${phoneDetails.status === "VALID" ? "valid" : "invalid"}`}>
                    <td>{phoneDetails.phone}</td>
                    <td>{phoneDetails.countryCode}</td>
                    <td>{phoneDetails.areaCode}</td>
                    <td>{phoneDetails.number}</td>
                    <td>{(phoneDetails.provinces?.length > 0 ? phoneDetails.provinces[0] : '')}</td>
                    <td>{(phoneDetails.cities?.length > 0 ? phoneDetails.cities[0] : '')}</td>
                    {/* <td>{(phoneDetails.provinces || []).join(', ')}</td> */}
                    {/* <td>{(phoneDetails.cities || []).join(', ')}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberValidator;
