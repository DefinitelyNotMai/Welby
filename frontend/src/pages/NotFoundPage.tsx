// lib
import { Flex, Heading } from "@chakra-ui/react";

//local
import { WelcomeLayout } from "../layout/WelcomeLayout";

export const NotFoundPage = () => {
  document.title = "404: This page could not be found";

  return (
    <WelcomeLayout noBackground>
      <Flex alignItems="center" justifyContent="center" minHeight="100vh">
        <Flex>
          <Heading variant="404-title">404&nbsp;</Heading>
          <Heading variant="404-description">
            &nbsp;This page could not be found
          </Heading>
        </Flex>
      </Flex>
    </WelcomeLayout>
  );
};
