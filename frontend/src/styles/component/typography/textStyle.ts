// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const textStyle = defineStyleConfig({
  variants: {
    form: {
      color: "#ffffff",
      fontSize: "0.875rem",
    },
  },
  defaultProps: {
    variant: "form",
  },
});
