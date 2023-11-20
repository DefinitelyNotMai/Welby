// lib
import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  welcome: definePartsStyle({
    container: {
      backgroundColor: "#24a2f0",
      borderRadius: "2xl",
      boxShadow: "dark-lg",
      color: "#ffffff",
      marginX: [4, 8],
      marginY: [8, 16],
    },
    header: {
      fontWeight: "bold",
      marginBottom: 4,
    },
  }),
  section: definePartsStyle({
    container: {
      backgroundColor: "#ffffff",
    },
    header: {
      borderBottom: "2px solid #ebebeb",
      color: "#2e2e2e",
      fontSize: "1.25rem",
      fontWeight: "bold",
      margin: 0,
    },
  }),
};

export const cardStyle = defineMultiStyleConfig({ variants });
