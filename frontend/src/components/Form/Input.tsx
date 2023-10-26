import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface InputProps extends ChakraInputProps {
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
}

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
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ color: "input.placeholder" }}
      type={type}
      value={value}
      {...props}
    />
  );
};

export default Input;
