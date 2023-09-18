import { Flex, Icon, Link, Text } from '@chakra-ui/react';

type SidebarItemProps = {
    borderLeft?: string;
    children: string;
    color?: string;
    icon?: React.ElementType;
    onClick?: () => void;
};

const SidebarItem = ({
    borderLeft,
    children,
    color = '#bcbcbc',
    icon: IconComponent,
    onClick,
}: SidebarItemProps) => {
    return (
        <Link>
            <Flex
                borderLeft={`4px solid ${borderLeft}`}
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

export default SidebarItem;
