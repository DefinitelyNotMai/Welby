import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import CustomText from "../CustomText";

type EditVisionProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditVision = ({ isOpen, onClose }: EditVisionProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW="35%" p="16" bg="#24a2f0">
        <ModalHeader fontWeight="bold" fontSize="2xl" textAlign="center">
          <CustomText>VISION</CustomText>
        </ModalHeader>
        <ModalBody>
          <Textarea backgroundColor="white" h="10rem" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditVision;
