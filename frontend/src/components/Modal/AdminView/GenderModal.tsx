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
import { Gender } from "../../../data/gender";

type GenderModalProps = Gender & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Gender>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const GenderAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...genderData
}: GenderModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addGenderUrl = "https://localhost:44373/api/AddGender";
    const gender = {
      Gender: genderData.Gender,
      Biological: true,
      Encoded_By: 24287,
    };

    axios
      .post(addGenderUrl, gender, config)
      .then(() => {
        toast({
          description: `Gender "${genderData.Gender}" has been added.`,
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
          description: `Failed to add Gender "${genderData.Gender}". Please try again.`,
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
        <ModalHeader>Add Gender</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="gender" isRequired label="Title">
              <Input
                id="gender"
                name="gender"
                onChange={(e) => updateFields?.({ Gender: e.target.value })}
                placeholder="Title"
                type="text"
                value={genderData.Gender}
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

export const GenderUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...genderData
}: GenderModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateGenderUrl = "https://localhost:44373/api/UpdateGender";
    const gender = {
      GenderId: genderData.GenderId,
      Gender: genderData.Gender,
      Biological: genderData.Biological,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateGenderUrl, gender, config)
      .then(() => {
        toast({
          description: `Gender "${genderData.Gender}" has been updated.`,
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
          description: `Failed to update gender "${genderData.Gender}". Please try again.`,
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
        <ModalHeader>Update Gender</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="gender" isRequired label="Title">
              <Input
                id="gender"
                name="gender"
                onChange={(e) => updateFields?.({ Gender: e.target.value })}
                placeholder="Title"
                type="text"
                value={genderData.Gender}
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

export const GenderDelete = ({
  isOpen,
  onClose,
  ...genderData
}: GenderModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteGenderUrl = "https://localhost:44373/api/RemoveGender";
    const gender = {
      GenderId: genderData.GenderId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteGenderUrl, gender, config)
      .then(() => {
        toast({
          description: `Gender "${genderData.Gender} has been deleted."`,
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
          description: `Failed to delete Gender "${genderData.Gender}". Please try again.`,
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
        <ModalHeader>Delete Gender</ModalHeader>
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
              {genderData.Gender}
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
