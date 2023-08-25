import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type DashboardTabProps = {
    children: ReactNode;
};

const DashboardTab = ({ children }: DashboardTabProps) => {
    return (
        <Flex
            flexDirection="row"
            mt="4"
            ml="4"
            bg="#ffffff"
            width="100%"
            boxShadow="md"
            borderRadius="1rem 0 0 1rem"
        >
            {children}
        </Flex>
    );
};

export default DashboardTab;

