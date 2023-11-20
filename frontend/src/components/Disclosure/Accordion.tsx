import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionIcon,
  AccordionPanel,
  Icon,
} from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";

type AccordionButtonProps = ChakraAccordionButtonProps & {
  children: ReactNode;
  buttonName: string;
  icon: ElementType;
};

export const AccordionButton = ({
  buttonName,
  children,
  icon: IconComponent,
  ...props
}: AccordionButtonProps) => {
  return (
    <>
      <ChakraAccordionButton {...props} paddingY={4}>
        {Icon && <Icon as={IconComponent} marginX={3} />}
        {buttonName}
        <AccordionIcon />
      </ChakraAccordionButton>
      <AccordionPanel padding={0}>{children}</AccordionPanel>
    </>
  );
};
