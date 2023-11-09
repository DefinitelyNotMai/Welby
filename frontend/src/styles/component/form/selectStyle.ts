// lib
import { defineStyleConfig } from "@chakra-ui/react";

export const selectStyle = defineStyleConfig({
  baseStyle: {
    field: {
      backgroundColor: "#ffffff",
      _placeholder: { color: "#bcbcbc" },
      color: "#757575",
      fontSize: "0.875rem",
      fontWeight: "medium",
    },
    icon: {
      color: "#757575",
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
});
