import { Input } from '@chakra-ui/react';

type CustomTextboxProps = {
  mb?: string;
  placeholder?: string;
  type?: string;
};

const CustomTextbox = ({ mb = '5', placeholder, type }: CustomTextboxProps) => {
  return (
    <Input
      bg="#ffffff"
      cursor="text"
      border="none"
      mb={mb}
      fontFamily="Montserrat"
      fontWeight="500"
      placeholder={placeholder}
      type={type}
    ></Input>
  );
};

export default CustomTextbox;
