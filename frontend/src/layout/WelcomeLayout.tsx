import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import BackgroundImage from "../assets/images/workshop.png";
import Footer from "../components/DataDisplay/Footer";
import WelcomeHeader from "../components/DataDisplay/WelcomeHeader";

interface WelcomeLayoutProps {
  children: ReactNode;
  noBackground?: boolean;
}

const WelcomeLayout = ({ children, noBackground }: WelcomeLayoutProps) => {
  return (
    <>
      <WelcomeHeader />
      {!noBackground ? (
        <Flex
          alignItems="center"
          backgroundImage={BackgroundImage}
          backgroundSize="cover"
          justifyContent="center"
          flex={1}
        >
          {children}
        </Flex>
      ) : (
        <Flex alignItems="center" justifyContent="center" flex={1}>
          {children}
        </Flex>
      )}
      <Footer />
    </>
  );
};

export default WelcomeLayout;
