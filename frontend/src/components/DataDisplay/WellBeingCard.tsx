import { Card, CardBody, Flex, Grid, Icon, Text } from "@chakra-ui/react";

type WellBeingCardProps = {
  icon?: React.ElementType;
  mb?: string;
  valueInt?: number;
  valueString?: string;
  title?: string;
};

export const WellBeingCard = ({
  icon: IconComponent,
  mb,
  valueInt,
  valueString,
  title,
}: WellBeingCardProps) => {
  return (
    <>
      <Card boxShadow="md" bg="#ffffff" padding={0} borderRadius="1rem" mb={mb}>
        <CardBody>
          <Grid templateColumns="1fr 2fr 1fr" gap={4}>
            <Flex alignItems="center">
              <Icon as={IconComponent} boxSize={16} color="#24a2f0" />
            </Flex>
            <Flex flexDirection="column">
              <Text
                color="#7c7c7c"
                fontFamily="Montserrat"
                fontWeight="bold"
                fontSize="sm"
              >
                {title}
              </Text>
              <Text
                color="#2f2f2f"
                fontFamily="Montserrat"
                fontWeight="extrabold"
                fontSize="2rem"
              >
                {valueInt * 20}%
              </Text>
              <Text
                color="#727272"
                fontFamily="Montserrat"
                fontWeight="semibold"
                fontSize="sm"
              >
                {valueString}
              </Text>
            </Flex>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};
