import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionIcon as ChakraAccordionIcon,
  AccordionPanel as ChakraAccordionPanel,
  Icon,
} from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";

type AccordionButtonProps = ChakraAccordionButtonProps & {
  children: ReactNode;
  buttonName: string;
  icon: ElementType;
};

const AccordionButton = ({
  buttonName,
  icon: IconComponent,
  children,
  ...props
}: AccordionButtonProps) => {
  return (
    <>
      <ChakraAccordionButton
        {...props}
        fontFamily="Montserrat"
        fontSize={["xs", "sm"]}
        fontWeight="medium"
        paddingY={4}
      >
        {Icon && <Icon as={IconComponent} marginX="3" />}
        {buttonName}
        <ChakraAccordionIcon />
      </ChakraAccordionButton>
      <ChakraAccordionPanel padding={0}>{children}</ChakraAccordionPanel>
    </>
  );
};

export default AccordionButton;
