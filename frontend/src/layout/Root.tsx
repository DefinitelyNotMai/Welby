// lib
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <Flex flexDirection="column" height="100vh">
      <Outlet />
    </Flex>
  );
};
