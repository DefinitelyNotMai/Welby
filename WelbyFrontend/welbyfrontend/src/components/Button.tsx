import { Button, Icon, Text } from '@chakra-ui/react';

type CustomButtonProps = {
    bg?: string;
    color?: string;
    children?: React.ReactNode;
    icon?: React.ElementType;
    iconColor?: string;
    isDisabled?: boolean;
    onClick?: () => void;
    width?: string | string[];
    m?: string;
    mb?: string;
    ml?: string;
    mr?: string;
    mt?: string;
    mx?: string;
    my?: string;
    p?: string;
    pb?: string;
    pl?: string;
    pr?: string;
    pt?: string;
    px?: string;
    py?: string;
};

const CustomButton = ({
    bg = '#24a2f0',
    color,
    children,
    icon: IconComponent,
    iconColor,
    isDisabled,
    onClick,
    width,
    m,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
    p,
    pb,
    pl,
    pr,
    pt,
    px,
    py,
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
