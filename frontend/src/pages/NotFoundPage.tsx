import { Flex } from "@chakra-ui/react";
import Heading from "../components/Typography/Heading";
import WelcomeLayout from "../layout/WelcomeLayout";

const NotFoundPage = () => {
  document.title = "404: This page could not be found";

  return (
    <WelcomeLayout noBackground>
      <Flex alignItems="center" justifyContent="center" minHeight="100vh">
        <Flex>
          <Heading
            borderRight="1px solid black"
            color="black"
            fontWeight="medium"
            fontSize={["xl", "2xl"]}
            variant="black"
          >
            404&nbsp;
          </Heading>
          <Heading
            fontFamily="Roboto"
            fontWeight="normal"
            fontSize={["xl", "2xl"]}
            variant="black"
          >
            &nbsp;This page could not be found
          </Heading>
        </Flex>
      </Flex>
    </WelcomeLayout>
  );
};

export default NotFoundPage;
