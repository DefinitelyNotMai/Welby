import { Card } from '@chakra-ui/react';
import { ReactNode } from 'react';

type MainFormCardProps = {
  children: ReactNode;
};

const MainFormCard = ({ children }: MainFormCardProps) => {
  return (
    <Card
      boxShadow="dark-lg"
      bg="#24a2f0"
      p={{ base: '8', md: '16' }}
      my="5rem"
      borderRadius="2xl"
    >
      {children}
    </Card>
  );
};

export default MainFormCard;
