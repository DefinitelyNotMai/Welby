// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const textStyle = defineStyleConfig({
  variants: {
    form: {
      color: "#ffffff",
      fontSize: "0.875rem",
    },
    "slider-label": {
      color: "#ffffff",
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
  },
  defaultProps: {
    variant: "form",
  },
});
