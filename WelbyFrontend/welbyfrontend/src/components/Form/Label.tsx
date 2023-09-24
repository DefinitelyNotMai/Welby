import { Text } from "@chakra-ui/react";

type LabelProps = {
    color?: string;
    name: string;
    mb?: string | number;
    ml?: string | number;
    mr?: string | number;
    mt?: string | number;
    mx?: string | number;
    my?: string | number;
    pb?: string | number;
    pl?: string | number;
    pr?: string | number;
    pt?: string | number;
    px?: string | number;
    py?: string | number;
    w?: string | number;
};

const Label = ({
    color = "#6b6b6b",
    name,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
    pb,
    pl,
    pr,
    pt,
    px,
    py,
    w,
}: LabelProps) => {
    return (
        <Text
            color={color}
            fontFamily="Montserrat"
            fontWeight="500"
            fontSize="16"
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            mx={mx}
            my={my}
            pb={pb}
            pl={pl}
            pr={pr}
            pt={pt}
            px={px}
            whiteSpace="nowrap" // Prevent text wrapping
            py={py}
            w={w}
        >
            {name}
        </Text>
    );
}

export default Label;