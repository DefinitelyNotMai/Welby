import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      1: "#24a2f0",
      2: "#78e1e8",
    },
    secondary: {
      y: "#f0d124",
      gr: "#34313a",
      w: "#fff8e5",
    },
    input: {
      placeholder: "#bcbcbc",
      text: "#757575",
    },
  },
});

export default theme;
