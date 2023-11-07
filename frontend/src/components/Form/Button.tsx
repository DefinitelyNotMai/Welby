import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Icon,
} from "@chakra-ui/react";
import { ElementType } from "react";

type ButtonProps = ChakraButtonProps & {
  children: ChakraButtonProps["children"];
  buttonVariant: "primary" | "masterCrud" | "sidebar" | "submit";
  icon?: ElementType;
};

const Button = ({
  children,
  buttonVariant,
  icon: IconComponent,
  ...props
}: ButtonProps) => {
  const buttonVariants = {
    primary: {
      backgroundColor: "#24a2f0",
      borderColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: "2px",
      color: "#ffffff",
    },
    submit: {
      backgroundColor: "#ffffff",
      color: "#6c6c6c",
    },
    sidebar: {
      _hover: { boxShadow: "outline" },
      backgroundColor: "#ffffff",
      borderRadius: "none",
      borderLeftWidth: "5px",
      boxShadow: "none",
      fontWeight: "normal",
      paddingY: 2,
      marginY: 2,
      justifyContent: "flex-start",
    },
    masterCrud: {
      backgroundColor: "#ffffff",
      borderColor: "#ebebeb",
      borderWidth: "2px",
    },
  };

  return (
    <ChakraButton
      _hover={{ boxShadow: "dark-lg" }}
      boxShadow="2xl"
      fontFamily="Montserrat"
      fontSize={["xs", "sm"]}
      fontWeight="bold"
      width="100%"
      {...buttonVariants[buttonVariant]}
      {...props}
    >
      {IconComponent && <Icon as={IconComponent} marginX="3" />}
      {children}
    </ChakraButton>
  );
};

export default Button;
