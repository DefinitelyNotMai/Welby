// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const inputStyle = defineStyleConfig({
  variants: {
    form: {
      backgroundColor: "#ffffff",
      borderColor: "#f6f6f6",
      borderStyle: "solid",
      borderWidth: "2px",
      field: {
        _placeholder: { color: "#bcbcbc" },
        backgroundColor: "#ffffff",
        color: "#757575",
        fontWeight: "medium",
        fontSize: "0.875rem",
      },
    },
  },
  defaultProps: {
    variant: "form",
  },
});
