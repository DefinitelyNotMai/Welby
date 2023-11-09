// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const textareaStyle = defineStyleConfig({
  baseStyle: {},
  variants: {
    form: {
      _placeholder: { textColor: "#bcbcbc" },
      backgroundColor: "#ffffff",
      borderColor: "#f6f6f6",
      borderStyle: "solid",
      borderWidth: "2px",
      fontSize: "0.875rem",
      fontWeight: "medium",
      height: "10rem",
      textColor: "#757575",
    },
  },
  defaultProps: {
    variant: "form",
  },
});
