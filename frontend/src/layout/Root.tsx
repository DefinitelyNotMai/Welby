import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh" minWidth="100%">
      <Outlet />
    </Flex>
  );
};

export default Root;
