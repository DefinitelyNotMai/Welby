// lib
import { sliderAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  sliderAnatomy.keys,
);

export const sliderStyle = defineMultiStyleConfig({
  variants: {
    form: {
      thumb: {
        backgroundColor: "transparent",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        borderTop: "25px solid #252525",
        boxShadow: "none",
        width: 5,
      },
      track: {
        backgroundColor: "#ebebeb",
      },
    },
  },
  defaultProps: {
    variant: "form",
  },
});
