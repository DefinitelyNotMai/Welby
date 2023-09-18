import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type SidebarProps = {
    children?: ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
    return (
        <Flex
            backgroundColor="#ffffff"
            flexDirection="column"
            minH="100vh"
            borderRight="2px solid #ebebeb"
            pr="10"
            w="12%"
        >
            {children}
        </Flex>
    );
};

export default Sidebar;
