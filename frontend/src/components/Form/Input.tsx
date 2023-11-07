import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";

type InputProps = ChakraInputProps & {
  id: ChakraInputProps["id"];
  name: ChakraInputProps["name"];
  onChange: ChakraInputProps["onChange"];
  placeholder: ChakraInputProps["placeholder"];
  type: ChakraInputProps["type"];
  value: ChakraInputProps["value"];
};

const Input = ({
  id,
  name,
  onChange,
  placeholder,
  type,
  value,
  ...props
}: InputProps) => {
  return (
    <ChakraInput
      autoComplete="off"
      backgroundColor="#ffffff"
      color="#757575"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ color: "#bcbcbc" }}
      type={type}
      value={value}
      {...props}
    />
  );
};

export default Input;
