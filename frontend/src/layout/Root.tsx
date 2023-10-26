import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Outlet />
    </Flex>
  );
};

export default Root;
