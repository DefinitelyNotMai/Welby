import { Flex, Icon, Link, Text } from '@chakra-ui/react';

type CustomDashboardSidebarItemProps = {
  children: string;
  icon: React.ElementType;
};

const DashboardSidebarItem = ({
  children,
  icon: IconComponent,
}: CustomDashboardSidebarItemProps) => {
  return (
    <Link
      fontFamily="Montserrat"
      fontWeight="400"
      ml="3"
      my="3"
      py="2"
      w="100%"
    >
      <Flex flexDirection="row" alignItems="center">
        <Icon as={IconComponent} mx="3" color="000000" />
        <Text color="#bcbcbc">{children}</Text>
      </Flex>
    </Link>
  );
};

export default DashboardSidebarItem;
