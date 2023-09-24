import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type SectionProps = {
    borderRadius?: string;
    children: ReactNode;
    headerComponents?: ReactNode[];
    mb?: string;
    minH?: string;
    title: string;
};

const Section = ({ borderRadius = "1rem 0 0 1rem", children, headerComponents, mb, minH, title }: SectionProps) => {
    return (
        <>
            <Card
                boxShadow="md"
                bg="#ffffff"
                p="0"
                borderRadius={borderRadius}
                mb={mb}
                minH={minH}
            >
                <CardHeader borderBottom="2px solid #ebebeb" display="flex" alignItems="center" justifyContent="space-between">
                    <Text fontFamily="Montserrat" fontWeight="700" fontSize="20">
                        {title}
                    </Text>
                    <Box display="flex" alignItems="center">
                        {headerComponents && headerComponents.map((component, index) => (
                            <Box key={index} ml={index !== 0 ? 2 : 0}>
                                {component}
                            </Box>
                        ))}
                    </Box>
                </CardHeader>
                <CardBody>{children}</CardBody>
            </Card>
        </>
    );
};

export default Section;
