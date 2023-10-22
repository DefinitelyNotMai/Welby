import { Box, Card, Flex } from "@chakra-ui/react";
import CustomText from "../../CustomText";

type QuestionItemProps = {
  children: React.ReactNode;
  marginBottom?: number;
  question: string;
};

const QuestionItem = ({
  children,
  marginBottom,
  question,
}: QuestionItemProps) => {
  return (
    <Card
      backgroundColor="#24a2f0"
      border="5px solid #a1d8dc"
      borderRadius="0.75rem"
      gap={4}
      marginBottom={marginBottom}
      padding={4}
    >
      <Box fontWeight="bold">
        <CustomText>{question}</CustomText>
      </Box>
      <Flex
        alignItems="center"
        color="#ffffff"
        flexDirection="row"
        fontFamily="Montserrat"
        fontSize="sm"
        fontWeight="normal"
        justifyContent="space-between"
      >
        {children}
      </Flex>
    </Card>
  );
};

export default QuestionItem;
