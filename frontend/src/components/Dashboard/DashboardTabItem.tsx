import { Flex, Link, Text } from "@chakra-ui/react";

type DashboardTabItemProps = {
  borderBottom: string;
  children: string;
  color?: string;
  onClick?: () => void;
};

const DashboardTabItem = ({
  borderBottom,
  children,
  color = "input.placeholder",
  onClick,
}: DashboardTabItemProps) => {
  return (
    <Link marginLeft={4}>
      <Flex
        borderBottom={borderBottom}
        fontFamily="Montserrat"
        fontWeight={500}
        fontSize="sm"
        height="100%"
        padding={2}
        width="100%"
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
