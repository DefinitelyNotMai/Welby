import { Box, Card, CardBody, Flex, Grid, Icon } from "@chakra-ui/react";
import { ElementType } from "react";
import CustomText from "../CustomText";

type WellBeingCardProps = {
  icon: ElementType;
  marginBottom?: number;
  dataValue: number;
  title: string;
};

const WellBeingCard = ({
  icon: IconComponent,
  marginBottom,
  dataValue,
  title,
}: WellBeingCardProps) => {
  return (
    <Card
      boxShadow="md"
      backgroundColor="#ffffff"
      borderRadius="1rem"
      marginBottom={marginBottom}
    >
      <CardBody>
        <Grid templateColumns="1fr 2fr 1fr" gap={4}>
          <Flex alignItems="center">
            <Icon as={IconComponent} boxSize={16} color="#24a2f0" />
          </Flex>
          <Flex flexDirection="column">
            <Box fontSize="md">
              <CustomText color="#7c7c7c" fontWeight="bold">
                {title}
              </CustomText>
            </Box>
            <Box fontSize="4xl">
              <CustomText color="#2f2f2f" fontWeight="bold">
                {dataValue}%
              </CustomText>
            </Box>
            <Box fontSize="sm">
              <CustomText color="#727272" fontWeight="medium">
                Previous Week
              </CustomText>
            </Box>
          </Flex>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default WellBeingCard;
