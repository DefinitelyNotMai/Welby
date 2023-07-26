import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

type MainFormButtonProps = {
    mb?: string;
    ml?: string;
    width?: string | string[];
    children: ReactNode;
    onClickEvent?: () => void;
    isDisabled?: boolean;
};

const MainFormButton = ({
    mb = '5',
    ml = '5',
    width,
    children,
    onClickEvent,
    isDisabled,
}: MainFormButtonProps) => {
    return (
        <Button
            bg="#24a2f0"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#ffffff"
            border="2px"
            boxShadow="md"
            mb={mb}
            ml={ml}
            w={width}
            type="submit"
            onClick={onClickEvent}
            isDisabled={isDisabled}
        >
            {children}
        </Button>
    );
};

export default MainFormButton;
