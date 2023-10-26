import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface TextProps extends ChakraTextProps {
  children: ReactNode;
  variant: "white" | "black";
}

const Text = ({ children, variant, ...props }: TextProps) => {
  const textVariants = {
    white: {
      color: "white",
    },
    black: {
      color: "black",
    },
  };

  return (
    <ChakraText
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      {...textVariants[variant]}
      {...props}
    >
      {children}
    </ChakraText>
  );
};

export default Text;
