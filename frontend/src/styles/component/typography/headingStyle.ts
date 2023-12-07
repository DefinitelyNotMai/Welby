// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const headingStyle = defineStyleConfig({
  variants: {
    welcome: {
      color: "#ffffff",
      fontSize: "2rem",
      fontWeight: "bold",
    },
    "404-title": {
      borderRight: "1px solid #000000",
      color: "#000000",
      fontFamily: "Roboto",
      fontWeight: "medium",
    },
    "404-description": {
      color: "#000000",
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
    profile: {
      color: "#000000",
      fontSize: "1.5rem",
      fontWeight: "semibold",
    },
  },
  defaultProps: {
    variant: "welcome",
  },
});
