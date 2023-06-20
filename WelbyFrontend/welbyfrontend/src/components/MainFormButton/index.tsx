import { Button } from '@chakra-ui/react';

type MainFormButtonProps = {
  width?: string | string[];
  children: string;
  onClickEvent?: () => void;
};

const MainFormButton = ({
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
      w={width}
      onClick={onClickEvent}
    >
      {children}
    </Button>
  );
};

export default MainFormButton;
