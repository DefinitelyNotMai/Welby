import { Card, Center } from '@chakra-ui/react';
import { ReactNode } from 'react';

type MainFormCardProps = {
    children: ReactNode;
    w?: string | string[];
};

const MainFormCard = ({ children, w }: MainFormCardProps) => {
    return (
        <Center>
            <Card
                boxShadow="dark-lg"
                bg="#24a2f0"
                my="16"
                p="0"
                borderRadius="2xl"
                w={w}
            >
                {children}
            </Card>
        </Center>
    );
};

export default MainFormCard;
