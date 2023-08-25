import { Flex, Link, Text } from '@chakra-ui/react';

type CustomDashboardTabItemProps = {
    children: string;
    color?: string;
    onClick?: () => void;
};

const DashboardTabItem = ({
    children,
    color = "#bcbcbc",
    onClick,
}: CustomDashboardTabItemProps) => {
    return (
        <Link>
            <Flex
                fontFamily="Montserrat"
                fontWeight="400"
                fontSize="sm"
                ml="3"
                my="3"
                px="2"
                w="100%"
                onClick={onClick}
            >
                <Flex flexDirection="row" alignItems="center">
                    <Text color={color}>{children}</Text>
                </Flex>
            </Flex>
        </Link>
    );
};

export default DashboardTabItem;
