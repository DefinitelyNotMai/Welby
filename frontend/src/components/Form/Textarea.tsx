import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface TextareaProps extends ChakraTextareaProps {
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value: string;
}

const Textarea = ({
  id,
  name,
  onChange,
  placeholder,
  value,
  ...props
}: TextareaProps) => {
  return (
    <ChakraTextarea
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      height="10rem"
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ color: "input.placeholder" }}
      value={value}
      {...props}
    />
  );
};

export default Textarea;
