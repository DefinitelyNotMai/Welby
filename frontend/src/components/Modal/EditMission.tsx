// lib
import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useState, FormEvent } from "react";

// local

type EditMissionProps = {
  isOpen: boolean;
  missionData: string;
  onClose: () => void;
};

export const EditMission = ({
  isOpen,
  missionData,
  onClose,
}: EditMissionProps) => {
  const [editedMission, setEditedMission] = useState(missionData);

  const toast = useToast();

  const handleEditMission = async () => {
    try {
      // NOTE: replace success with axios call
      const success = true;

      if (success) {
        toast({
          title: "SUCCESS",
          description: "Successfully updated company's Mission",
          position: "top",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
      } else {
        toast({
          title: "ERROR",
          description: "Failed to update company's Mission",
          position: "top",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error updating mission: ", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEditMission();
  };

  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent minWidth="50%">
        <ModalHeader>Edit Mission</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleSubmit}>
          <Flex alignItems="center" flexDirection="column" gap={4} margin={8}>
            <Textarea
              onChange={(e) => setEditedMission(e.target.value)}
              value={editedMission}
            />
            <Button type="submit">SUBMIT</Button>
          </Flex>
        </Form>
      </ModalContent>
    </Modal>
  );
};
