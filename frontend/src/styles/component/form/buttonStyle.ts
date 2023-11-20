// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const buttonStyle = defineStyleConfig({
  baseStyle: {
    borderRadius: "lg",
    fontWeight: "bold",
  },
  variants: {
    primary: {
      _hover: { transform: "scale(1.1)" },
      backgroundColor: "#24a2f0",
      borderColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: "2px",
      color: "#ffffff",
      fontSize: "0.875rem",
    },
    submit: {
      _hover: { transform: "scale(1.1)" },
      backgroundColor: "#ffffff",
      border: "none",
      color: "#6c6c6c",
    },
    masterCrud: {
      _hover: { transform: "scale(1.1)" },
      backgroundColor: "#ff0000",
      border: "none",
      color: "#6c6c6c",
    },
    sidebar: {
      _hover: {
        borderLeft: "5px solid #bcbcbc",
      },
      backgroundColor: "#ffffff",
      borderColor: "#ffffff",
      borderStyle: "solid",
      borderWidth: "5px",
      borderRadius: "0",
      justifyContent: "flex-start",
      paddingLeft: 16,
    },
    tab: {
      _hover: {
        borderBottom: "5px solid #bcbcbc",
      },
      backgroundColor: "#ffffff",
      borderRadius: "0",
      height: "100%",
      paddingX: 2,
    },
    "section-secondary": {
      _hover: { transform: "scale(1.1)" },
      backgroundColor: "#ffffff",
      borderRadius: "0",
      color: "#000000",
      fontWeight: "normal",
      height: "100%",
      padding: 2,
    },
    list: {
      _hover: { backgroundColor: "#24a2f0" },
      backgroundColor: "#cccccc",
      color: "#ffffff",
      height: "100%",
      padding: 2,
    },
  },
  defaultProps: {
    variant: "primary",
  },
});
