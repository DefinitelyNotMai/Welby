import { Input } from '@chakra-ui/react';

type TextboxProps = {
    defaultValue?: string;
    mb?: string;
    ml?: string;
    mr?: string;
    mt?: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
    w?: string;
};

const Textbox = ({ defaultValue, mb = '5', ml, mr, mt, placeholder, type, value, onChange, isDisabled, w }: TextboxProps) => {
    return (
        <Input
            bg="#ffffff"
            cursor="text"
            defaultValue={defaultValue}
            border="none"
            mb={mb}
            mr={mr}
            ml={ml}
            mt={mt}
            fontFamily="Montserrat"
            fontWeight="500"
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            isDisabled={isDisabled}
            w={w}
        />
    );
};

export default Textbox;
