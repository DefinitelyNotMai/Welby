// lib
import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    borderRadius: "2xl",
    boxShadow: "dark-lg",
    marginX: [4, 8],
    marginY: [8, 16],
  },
  header: {
    marginBottom: 4,
    fontWeight: "bold",
  },
});

const variants = {
  welcome: definePartsStyle({
    container: {
      backgroundColor: "#24a2f0",
      color: "#ffffff",
    },
  }),
};

export const cardStyle = defineMultiStyleConfig({ baseStyle, variants });
