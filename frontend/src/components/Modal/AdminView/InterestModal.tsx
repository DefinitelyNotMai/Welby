// lib
import axios from "axios";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

// local
import { FormEvent } from "react";
import { FormItem } from "../../Form/FormItem";
import { Interest } from "../../../data/interest";

type InterestModalProps = Interest & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Interest>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const InterestAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...interestData
}: InterestModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addInterestUrl = "https://localhost:44373/api/AddInterest";
    const interest = {
      Name: interestData.Name,
      Encoded_By: 24287,
    };

    axios
      .post(addInterestUrl, interest, config)
      .then(() => {
        toast({
          description: `Interest "${interestData.Name}" has been added.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "success",
          title: "SUCCESS",
        });
        onClose();
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
        toast({
          description: `Failed to add Interest "${interestData.Name}". Please try again.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "error",
          title: "Error",
        });
      });
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
      <ModalContent maxHeight="90vh" minWidth="50%" overflowY="auto">
        <ModalHeader>Add Interest</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="interest" isRequired label="Interest Name">
              <Input
                id="interest"
                name="interest"
                onChange={(e) => updateFields?.({ Name: e.target.value })}
                placeholder="Interest Name"
                type="text"
                value={interestData.Name}
              />
            </FormItem>
            <Flex flexDirection="row" gap={4}>
              <Button onClick={onClose} variant="submit">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add
              </Button>
            </Flex>
          </Flex>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export const InterestUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...interestData
}: InterestModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateInterestUrl = "https://localhost:44373/api/UpdateInterest";
    const interest = {
      InterestId: interestData.InterestId,
      Name: interestData.Name,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateInterestUrl, interest, config)
      .then(() => {
        toast({
          description: `Interest "${interestData.Name}" has been updated.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "success",
          title: "SUCCESS",
        });
        onClose();
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
        toast({
          description: `Failed to update interest "${interestData.Name}". Please try again.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "error",
          title: "Error",
        });
      });
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
      <ModalContent maxHeight="90vh" minWidth="50%" overflowY="auto">
        <ModalHeader>Update Interest</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="interest-name" isRequired label="Interest Name">
              <Input
                id="interest-name"
                name="interest-name"
                onChange={(e) => updateFields?.({ Name: e.target.value })}
                placeholder="Title"
                type="text"
                value={interestData.Name}
              />
            </FormItem>
            <Flex flexDirection="row" gap={4}>
              <Button onClick={onClose} variant="submit">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Flex>
          </Flex>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export const InterestDelete = ({
  isOpen,
  onClose,
  ...interestData
}: InterestModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteInterestUrl = "https://localhost:44373/api/RemoveInterest";
    const interest = {
      InterestId: interestData.InterestId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteInterestUrl, interest, config)
      .then(() => {
        toast({
          description: `Interest "${interestData.Name} has been deleted."`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "success",
          title: "SUCCESS",
        });
        onClose();
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
        toast({
          description: `Failed to delete Interest "${interestData.Name}". Please try again.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "error",
          title: "Error",
        });
      });
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
      <ModalContent minWidth="35%">
        <ModalHeader>Delete Interest</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleDelete}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={8}
            justifyContent="center"
          >
            <Text color="#ffffff" fontSize="1.25rem">
              Are you sure you want to delete &quot;
              {interestData.Name}
              &quot;?
            </Text>
            <Flex flexDirection="row" gap={4} marginBottom={4}>
              <Button onClick={onClose} variant="submit">
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Delete
              </Button>
            </Flex>
          </Flex>
        </Form>
      </ModalContent>
    </Modal>
  );
};
