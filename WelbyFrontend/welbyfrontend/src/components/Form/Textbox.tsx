import { Input } from '@chakra-ui/react';

type TextboxProps = {
    bg?: string;
    border?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
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

const Textbox = ({
    bg = "#ffffff",
    border = "2px solid #f6f6f6",
    placeholder,
    onChange,
    value,
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
    w
}: TextboxProps) => {
    return (
        <Input
            bg={bg}
            border={border}
            color="#000000"
            focusBorderColor="#24a2f0"
            fontFamily="Montserrat"
            fontWeight="500"
            fontSize="16"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
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
            py={py}
            w={w}
        />
    );
}

export default Textbox;