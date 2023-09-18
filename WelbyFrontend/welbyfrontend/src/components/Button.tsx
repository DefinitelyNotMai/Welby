import { Button, Icon, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type CustomButtonProps = {
    bg?: string;
    color?: string;
    m?: string;
    mb?: string;
    ml?: string;
    mr?: string;
    mt?: string;
    icon?: React.ElementType;
    iconColor?: string;
    width?: string | string[];
    children?: ReactNode;
    onClick?: () => void;
    isDisabled?: boolean;
};

const CustomButton = ({
    bg = '#24a2f0',
    color,
    m,
    mb,
    ml,
    mr,
    mt,
    icon: IconComponent,
    iconColor,
    width,
    children,
    onClick,
    isDisabled,
}: CustomButtonProps) => {
    return (
        <Button
            bg={bg}
            color={color}
            fontFamily="Montserrat"
            fontWeight="500"
            borderColor="#ebebeb"
            borderWidth="2px"
            m={m}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            w={width}
            onClick={onClick}
            isDisabled={isDisabled}
        >
            {IconComponent && <Icon as={IconComponent} color={iconColor} mr="2" />}
            <Text>{children}</Text>
        </Button>
    );
};

export default CustomButton;
