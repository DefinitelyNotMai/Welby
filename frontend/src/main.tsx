// lib
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

// local
import "./styles/main.css";
import App from "./App.tsx";
import { overrides } from "./styles/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={overrides}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
