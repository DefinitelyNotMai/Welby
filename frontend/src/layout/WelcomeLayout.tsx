import { Center, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import BackgroundImage from "../assets/images/workshop.png";
import WelcomeFooter from "../components/Welcome/WelcomeFooter";
import WelcomeHeader from "../components/Welcome/WelcomeHeader";

type WelcomeLayoutProps = {
  children: ReactNode;
};

const WelcomeLayout = ({ children }: WelcomeLayoutProps) => {
  return (
    <Flex flexDirection="column" flex={1}>
      <WelcomeHeader />
      <Center backgroundImage={BackgroundImage} backgroundSize="cover" flex={1}>
        {children}
      </Center>
      <WelcomeFooter />
    </Flex>
  );
};

export default WelcomeLayout;
