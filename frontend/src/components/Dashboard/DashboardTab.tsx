import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type DashboardTabProps = {
  children: ReactNode;
};

const DashboardTab = ({ children }: DashboardTabProps) => {
  return (
    <Flex
      backgroundColor="white"
      borderRadius="1rem 0 0 1rem"
      boxShadow="md"
      flexDirection="row"
      height={12}
      width="100%"
    >
      {children}
    </Flex>
  );
};

export default DashboardTab;
