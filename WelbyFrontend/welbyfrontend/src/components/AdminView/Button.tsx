import { Button, Icon, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CustomButtonProps = {
    children: ReactNode;
    icon: React.ElementType;
    iconColor: string;
    mr?: string;
};

const CustomButton = ({
    children,
    icon: IconComponent,
    iconColor,
    mr,
}: CustomButtonProps) => {
    return (
        <Button
            bg="#ffffff"
            border="2px"
            borderColor="#ebebeb"
            color="#000000"
            fontFamily="Montserrat"
            fontWeight="500"
            mr={mr}
        >
            <Icon as={IconComponent} color={iconColor} mr="2" />
            <Text>{children}</Text>
        </Button>
    );
};

export default CustomButton;
