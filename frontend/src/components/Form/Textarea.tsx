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
      color="#757575"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      height="10rem"
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ color: "#bcbcbc" }}
      value={value}
      {...props}
    />
  );
};

export default Textarea;
