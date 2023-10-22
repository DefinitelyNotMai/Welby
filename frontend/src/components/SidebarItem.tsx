import { Flex, Icon } from "@chakra-ui/react";
import CustomText from "./CustomText";

type SidebarItemProps = {
  borderLeft: string;
  children: string;
  color?: string;
  icon?: React.ElementType;
  onClick?: () => void;
};

const SidebarItem = ({
  borderLeft,
  children,
  color,
  icon: IconComponent,
  onClick,
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
    >
      <Flex alignItems="center" flexDirection="row" marginLeft={8}>
        {Icon && <Icon as={IconComponent} marginX="3" color={color} />}
        <CustomText color={color}>{children}</CustomText>
      </Flex>
    </Flex>
  );
};

export default SidebarItem;
