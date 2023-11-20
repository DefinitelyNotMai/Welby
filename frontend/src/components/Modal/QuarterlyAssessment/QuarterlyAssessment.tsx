import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const QuarterlyAssessment = () => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Quarterly Assessment</ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </>
  );
};
