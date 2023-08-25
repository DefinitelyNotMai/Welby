import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type DashboardCardProps = {
    children: ReactNode;
    title?: string;
    mb?: string;
};

const DashboardCard = ({ children, title, mb }: DashboardCardProps) => {
    return (
        <Card
            boxShadow="md"
            bg="#ffffff"
            p="0"
            borderRadius="1rem 0 0 1rem"
            mb={mb}
        >
            <CardHeader borderBottom="2px solid #ebebeb">
                <Text fontFamily="Montserrat" fontWeight="700" fontSize="18">
                    {title}
                </Text>
            </CardHeader>
            <CardBody>{children}</CardBody>
        </Card>
    );
};

export default DashboardCard;
