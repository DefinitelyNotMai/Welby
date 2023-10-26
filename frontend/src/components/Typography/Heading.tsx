import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface HeadingProps extends ChakraHeadingProps {
  children: ReactNode;
  variant: "white" | "black";
}

const Heading = ({ children, variant, ...props }: HeadingProps) => {
  const headingVariants = {
    white: {
      color: "white",
    },
    black: {
      color: "black",
    },
  };

  return (
    <ChakraHeading
      fontFamily="Montserrat"
      fontWeight="bold"
      fontSize={["3xl", "4xl"]}
      {...headingVariants[variant]}
      {...props}
    >
      {children}
    </ChakraHeading>
  );
};

export default Heading;
