import { Box } from "@chakra-ui/react";
import CustomText from "../../CustomText";

type SliderIndicatorProps = {
  bgGradient: string;
  children: string;
};

const SliderIndicator = ({ bgGradient, children }: SliderIndicatorProps) => {
  return (
    <Box
      bgGradient={bgGradient}
      border="5px solid #ffffff"
      boxShadow="md"
      paddingY={8}
      textAlign="center"
      width="full"
    >
      <CustomText>{children}</CustomText>
    </Box>
  );
};

export default SliderIndicator;
