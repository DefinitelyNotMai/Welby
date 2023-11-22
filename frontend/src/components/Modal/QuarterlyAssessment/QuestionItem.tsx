import { Card, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type QuestionItemProps = {
  children: ReactNode;
  marginBottom?: string;
  question: string;
};

export const QuestionItem = ({
  children,
  marginBottom,
  question,
}: QuestionItemProps) => {
  return (
    <Card
      bg="#24a2f0"
      border="5px solid #a1d8dc"
      borderRadius="0.75rem"
      padding={4}
      marginBottom={marginBottom}
    >
      <Text
        color="#ffffff"
        fontFamily="Montserrat"
        fontWeight="600"
        fontSize="18"
        mb="4"
      >
        {question}
      </Text>
      <Flex
        flexDirection="row"
        alignItems="center"
        color="#ffffff"
        fontFamily="Montserrat"
        fontWeight="400"
        fontSize="14"
        justifyContent="space-between"
      >
        {children}
      </Flex>
    </Card>
  );
};
