import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";

type TextProps = ChakraTextProps & {
  children: ChakraTextProps["children"];
  color: ChakraTextProps["color"];
};

const Text = ({ children, color, ...props }: TextProps) => {
  return (
    <ChakraText
      color={color}
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      {...props}
    >
      {children}
    </ChakraText>
  );
};

export default Text;
