import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type DashboardSidebarProps = {
    children: ReactNode;
};

const DashboardSidebar = ({ children }: DashboardSidebarProps) => {
    return (
        <Flex
            flexDirection="column"
            h="100%"
            borderRight="2px solid #ebebeb"
            pr="10"
        >
            {children}
        </Flex>
    );
};

export default DashboardSidebar;

