// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const buttonStyle = defineStyleConfig({
  baseStyle: {
    _hover: { boxShadow: "dark-lg" },
    borderRadius: "lg",
    fontWeight: "bold",
  },
  variants: {
    primary: {
      backgroundColor: "#24a2f0",
      borderColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: "2px",
      color: "#ffffff",
      fontSize: "0.875rem",
    },
    submit: {
      backgroundColor: "#ffffff",
      border: "none",
      color: "#6c6c6c",
    },
    masterCrud: {
      backgroundColor: "#ff0000",
      border: "none",
      color: "#6c6c6c",
    },
  },
  defaultProps: {
    variant: "primary",
  },
});
