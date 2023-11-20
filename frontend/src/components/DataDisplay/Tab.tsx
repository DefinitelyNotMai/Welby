import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type TabProps = {
  children: ReactNode;
};

export const Tab = ({ children }: TabProps) => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="#ffffff"
      borderRadius="1rem 0 0 1rem"
      boxShadow="md"
      flexDirection="row"
      gap={4}
      height="5vh"
      paddingLeft={4}
      width="100%"
    >
      {children}
    </Flex>
  );
};
