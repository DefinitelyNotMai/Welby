import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Flex
      backgroundColor="#ffffff"
      borderRight="2px solid #ebebeb"
      flexDirection="column"
      paddingRight={16}
      paddingTop={4}
    >
      {children}
    </Flex>
  );
};

export default Sidebar;
