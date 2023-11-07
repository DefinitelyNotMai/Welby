import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";

type HeadingProps = ChakraHeadingProps & {
  children: ChakraHeadingProps["children"];
  color: ChakraHeadingProps["color"];
};

const Heading = ({ children, color, ...props }: HeadingProps) => {
  return (
    <ChakraHeading
      color={color}
      fontFamily="Montserrat"
      fontWeight="bold"
      fontSize={["3xl", "4xl"]}
      {...props}
    >
      {children}
    </ChakraHeading>
  );
};

export default Heading;
