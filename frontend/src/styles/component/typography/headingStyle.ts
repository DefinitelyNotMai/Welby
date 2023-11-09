// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const headingStyle = defineStyleConfig({
  baseStyle: {
    fontWeight: "bold",
  },
  variants: {
    welcome: {
      color: "#ffffff",
      fontSize: "2rem",
    },
  },
  defaultProps: {
    variant: "welcome",
  },
});
