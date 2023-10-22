import { Flex, Heading, HStack, Icon, Spacer } from "@chakra-ui/react";
import CustomText from "../../CustomText";

type ItemInfoProps = {
  children: string;
  description: string;
  icon: React.ElementType;
};

const ItemInfo = ({
  children,
  description,
  icon: IconComponent,
}: ItemInfoProps) => {
  return (
    <>
      <Heading as="h1" fontSize="2xl" marginBottom={4} textAlign="center">
        <CustomText color="#000000" fontWeight="bold">
          {children}
        </CustomText>
      </Heading>
      <Flex justifyContent="space-between">
        <Spacer />
        <HStack width="50%">
          {Icon && <Icon as={IconComponent} boxSize={16} color="#24a2f0" />}
          <Heading as="h2" fontSize="md" noOfLines={2} textAlign="left">
            <CustomText color="#5a5a5a">{description}</CustomText>
          </Heading>
        </HStack>
        <Spacer />
      </Flex>
    </>
  );
};

export default ItemInfo;
