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
          <Heading
            borderRight="1px solid #000000"
            color="#000000"
            fontFamily="Roboto"
            fontWeight="medium"
          >
            404&nbsp;
          </Heading>
          <Heading color="#000000" fontFamily="Roboto" fontWeight="normal">
            &nbsp;This page could not be found
          </Heading>
        </Flex>
      </Flex>
    </WelcomeLayout>
  );
};
