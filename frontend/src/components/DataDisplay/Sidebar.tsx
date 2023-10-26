import { FlexProps as ChakraFlexProps, Flex, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import Text from "../Typography/Text";

interface SidebarProps extends ChakraFlexProps {
  children: ReactNode;
}

const Sidebar = ({ children, ...props }: SidebarProps) => {
  return (
    <Flex
      backgroundColor="white"
      borderRight="2px solid #ebebeb"
      flexDirection="column"
      paddingRight={16}
      paddingTop={4}
      {...props}
    >
      {children}
    </Flex>
  );
};

interface SidebarItemProps extends ChakraFlexProps {
  borderLeft: string;
  children: string;
  color?: string;
  icon?: React.ElementType;
  onClick?: () => void;
}

const SidebarItem = ({
  borderLeft,
  children,
  color,
  icon: IconComponent,
  onClick,
  ...props
}: SidebarItemProps) => {
  return (
    <Flex
      borderLeft={borderLeft}
      fontFamily="Montserrat"
      fontSize="md"
      fontWeight="normal"
      marginY={2}
      paddingY={2}
      width="full"
      onClick={onClick}
      {...props}
    >
      <Flex alignItems="center" flexDirection="row" marginLeft={8}>
        {Icon && <Icon as={IconComponent} marginX="3" color={color} />}
        <Text variant="black">{children}</Text>
      </Flex>
    </Flex>
  );
};

export { Sidebar, SidebarItem };

