import { Card, CardBody, Flex, Grid, Icon, Text } from '@chakra-ui/react';

type DashboardCardProps = {
    icon?: React.ElementType;
    mb?: string;
    dataValue?: number;
    title?: string;
};

const DashboardCard = ({
    icon: IconComponent,
    mb,
    dataValue,
    title,
}: DashboardCardProps) => {
    return (
        <>
            <Card boxShadow="md" bg="#ffffff" p="0" borderRadius="1rem" mb={mb}>
                <CardBody>
                    <Grid templateColumns="1fr 2fr 1fr" gap="4">
                        <Flex alignItems="center">
                            <Icon as={IconComponent} boxSize="16" color="#24a2f0" />
                        </Flex>
                        <Flex flexDirection="column">
                            <Text
                                color="#7c7c7c"
                                fontFamily="Montserrat"
                                fontWeight="700"
                                fontSize="sm"
                            >
                                {title}
                            </Text>
                            <Text
                                color="#2f2f2f"
                                fontFamily="Montserrat"
                                fontWeight="800"
                                fontSize="32"
                            >
                                {dataValue}%
                            </Text>
                            <Text
                                color="#727272"
                                fontFamily="Montserrat"
                                fontWeight="600"
                                fontSize="sm"
                            >
                                Previous Week
                            </Text>
                        </Flex>
                    </Grid>
                </CardBody>
            </Card>
        </>
    );
};

export default DashboardCard;
