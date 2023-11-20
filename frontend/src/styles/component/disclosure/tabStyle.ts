import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const variants = {
  default: definePartsStyle({
    root: {
      width: "100%",
    },
    tab: {
      backgroundColor: "#000000",
    },
    tablist: {
      backgroundColor: "#000000",
    },
  }),
};

const defaultProps = {
  variant: "default",
};

export const tabStyle = defineMultiStyleConfig({ variants, defaultProps });
