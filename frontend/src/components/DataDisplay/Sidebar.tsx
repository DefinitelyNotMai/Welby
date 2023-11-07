// npm package imports
import { FlexProps as ChakraFlexProps, Flex, Icon } from "@chakra-ui/react";
import { ElementType } from "react";

// local imports
import Text from "../Typography/Text";

type SidebarProps = ChakraFlexProps & {
  children: ChakraFlexProps["children"];
};

const Sidebar = ({ children, ...props }: SidebarProps) => {
  return (
    <Flex
      backgroundColor="#ffffff"
      borderRight="2px solid #ebebeb"
      flexDirection="column"
      overflow="hidden"
      maxWidth={["50%", "40%", "30%", "15%"]}
      minWidth={["50%", "40%", "30%", "15%"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

type SidebarItemProps = ChakraFlexProps & {
  borderLeft: ChakraFlexProps["borderLeft"];
  children: ChakraFlexProps["children"];
  color?: ChakraFlexProps["color"];
  icon?: ElementType;
  onClick?: () => void;
};

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
        <Text color={color}>{children}</Text>
      </Flex>
    </Flex>
  );
};

export { Sidebar, SidebarItem };
