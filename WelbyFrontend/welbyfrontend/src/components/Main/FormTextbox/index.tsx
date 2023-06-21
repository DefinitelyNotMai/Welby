import { Input } from '@chakra-ui/react';

type CustomTextboxProps = {
  mb?: string;
  placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextbox = ({ mb = '5', placeholder, type, value, onChange }: CustomTextboxProps) => {
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
          value={value}
          onChange={onChange}
    ></Input>
  );
};

export default CustomTextbox;
