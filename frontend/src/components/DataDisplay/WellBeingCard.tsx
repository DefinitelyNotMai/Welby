import { Card, CardBody, Flex, Grid, Icon, Text } from "@chakra-ui/react";

type WellBeingCardProps = {
  icon?: React.ElementType;
  marginBottom?: string;
  onClick?: () => void;
  title?: string;
  valueInt?: number;
  valueString?: string;
};

export const WellBeingCard = ({
  icon: IconComponent,
  marginBottom,
  onClick,
  title,
  valueInt = 5,
  valueString,
}: WellBeingCardProps) => {
  return (
    <>
      <Card
        bg="#ffffff"
        borderRadius="1rem"
        boxShadow="md"
        marginBottom={marginBottom}
        onClick={onClick}
        padding={0}
      >
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
