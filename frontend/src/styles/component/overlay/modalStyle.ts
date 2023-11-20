// lib
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { modalAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

const baseStyle = definePartsStyle({
  dialog: {
    backgroundColor: "#24a2f0",
    marginX: [4, 8],
    marginY: [8, 16],
  },
  header: {
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  closeButton: {
    color: "#ffffff",
  },
});

export const modalStyle = defineMultiStyleConfig({ baseStyle });
