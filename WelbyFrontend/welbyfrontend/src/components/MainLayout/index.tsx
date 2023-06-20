import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import BackgroundImage from '../../assets/images/workshop.png';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Flex
      flexDirection="column"
      minH="100vh"
      backgroundImage={`url(${BackgroundImage})`}
      backgroundSize="cover"
    >
      {children}
    </Flex>
  );
};

export default MainLayout;
