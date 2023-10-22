import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import CustomText from "../CustomText";

type EditMissionProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EditMission = ({ isOpen, onClose }: EditMissionProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW="35%" p="16" bg="#24a2f0">
        <ModalHeader fontSize="2xl" textAlign="center">
          <CustomText>MISSION</CustomText>
        </ModalHeader>
        <ModalBody>
          <Textarea backgroundColor="white" h="10rem" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditMission;
