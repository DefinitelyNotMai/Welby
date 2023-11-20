import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Flex
      backgroundColor="#ffffff"
      borderRight="2px solid #ebebeb"
      flexDirection="column"
      gap={4}
      overflow="hidden"
      paddingTop={4}
      maxWidth={["50%", "40%", "30%", "15%"]}
      minWidth={["50%", "40%", "30%", "15%"]}
    >
      {children}
    </Flex>
  );
};
