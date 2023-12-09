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
import { useState, FormEvent, useContext } from "react";
import { UserContext } from "../../context/UserContext";

import axios from "axios";

// local

type EditVisionProps = {
  isOpen: boolean;
  visionData: string;
  onClose: () => void;
};

export const EditVision = ({
  isOpen,
  visionData,
  onClose,
}: EditVisionProps) => {
  const [editedVision, setEditedVision] = useState(visionData);

  const toast = useToast();
  const userContext = useContext(UserContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleEditVision = async () => {
    const updateVisionUrl = "https://localhost:44373/api/UpdateCompanyVision"
    try {
      // NOTE: replace success with axios call
      
      axios.patch(updateVisionUrl, {
        CompanyId: userContext.companyId,
        Vision: editedVision,
        Encoded_By: localStorage.getItem("userId")
      }, config).then((response) => {
        console.log(response);
        const success = true;
        if (success) {
          toast({
            title: "SUCCESS",
            description: "Successfully updated company's Vision",
            position: "top",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
        } else {
          toast({
            title: "ERROR",
            description: "Failed to update company's Vision",
            position: "top",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        }
      }).catch((error) => {
        console.log(error);
      })

      
     
    } catch (error) {
      console.error("Error updating vision: ", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEditVision();
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
        <ModalHeader>Edit Vision</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleSubmit}>
          <Flex alignItems="center" flexDirection="column" gap={4} margin={8}>
            <Textarea
              onChange={(e) => setEditedVision(e.target.value)}
              value={editedVision}
            />
            <Button type="submit">SUBMIT</Button>
          </Flex>
        </Form>
      </ModalContent>
    </Modal>
  );
};
