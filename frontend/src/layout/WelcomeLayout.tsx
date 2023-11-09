// lib
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

//local
import BackgroundImage from "../assets/images/workshop.png";
import { Footer } from "../components/DataDisplay/Footer";
import { WelcomeHeader } from "../components/DataDisplay/WelcomeHeader";

type WelcomeLayoutProps = {
  children: ReactNode;
  noBackground?: boolean;
};

export const WelcomeLayout = ({
  children,
  noBackground,
}: WelcomeLayoutProps) => {
  return (
    <>
      <WelcomeHeader />
      <Flex
        alignItems="center"
        background={noBackground ? "none" : `url(${BackgroundImage})`}
        backgroundSize={noBackground ? "initial" : "cover"}
        flex={1}
        flexDirection="column"
        justifyContent="center"
      >
        {children}
      </Flex>
      <Footer />
    </>
  );
};
