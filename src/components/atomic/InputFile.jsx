import { Button, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import PropTypes from "prop-types";

const InputFile = ({ handleInputFile }) => {
  const ref = useRef();
  const handleClick = () => {
    ref.current.value = null;
    ref.current.click();
  };

  return (
    <>
      <Button
        colorScheme="teal"
        minW="300px"
        onClick={handleClick}
        variant="outline"
        leftIcon={<IoMdCloudUpload />}
      >
        Subir archivo
      </Button>
      <Input
        ref={ref}
        type="file"
        accept=".csv"
        hidden
        onChange={handleInputFile}
      />
    </>
  );
};

InputFile.propTypes = {
  handleInputFile: PropTypes.func.isRequired,
};

export default InputFile;
