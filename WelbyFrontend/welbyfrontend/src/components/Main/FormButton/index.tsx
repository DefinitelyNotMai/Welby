import { Button } from '@chakra-ui/react';

type MainFormButtonProps = {
    mb?: string;
    width?: string | string[];
    children: string;
    onClickEvent?: () => void;
};

const MainFormButton = ({
    mb = '5',
    width,
    children,
    onClickEvent,
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
            w={width}
            onClick={onClickEvent}
        >
            {children}
        </Button>
    );
};

export default MainFormButton;
