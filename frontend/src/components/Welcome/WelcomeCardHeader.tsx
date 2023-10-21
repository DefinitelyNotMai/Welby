import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import CustomText from "../CustomText";

type WelcomeHeaderProps = {
  children: ReactNode;
  isCentered?: boolean;
};

const WelcomeCardHeader = ({ children, isCentered }: WelcomeHeaderProps) => {
  return (
    <Heading marginBottom={10} textAlign={isCentered ? "center" : "unset"}>
      <CustomText fontSize={["3xl", "4xl"]} fontWeight="bold">
        {children}
      </CustomText>
    </Heading>
  );
};

export default WelcomeCardHeader;
