import { Flex, Icon, Link, Text } from '@chakra-ui/react';

type DashboardSidebarItemProps = {
    children: string;
    color?: string;
    icon: React.ElementType;
    onClick?: () => void;
};

const DashboardSidebarItem = ({
    children,
    color = '#bcbcbc',
    icon: IconComponent,
    onClick,
}: DashboardSidebarItemProps) => {
    return (
        <Link>
            <Flex
                fontFamily="Montserrat"
                fontWeight="400"
                ml="3"
                my="3"
                py="2"
                w="100%"
                onClick={onClick}
            >
                <Flex flexDirection="row" alignItems="center">
                    <Icon as={IconComponent} mx="3" color={color} />
                    <Text color={color}>{children}</Text>
                </Flex>
            </Flex>
        </Link>
    );
};

export default DashboardSidebarItem;