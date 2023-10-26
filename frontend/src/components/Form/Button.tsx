import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
}

const Button = ({ children, variant, ...props }: ButtonProps) => {
  const buttonVariants = {
    primary: {
      backgroundColor: "primary.1",
      border: "2px solid white",
      color: "white",
    },
    secondary: {
      backgroundColor: "primary",
      border: "2px solid primary.1",
      color: "black",
    },
  };

  return (
    <ChakraButton
      _hover={{ boxShadow: "dark-lg" }}
      boxShadow="2xl"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="bold"
      width="100%"
      {...buttonVariants[variant]}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
