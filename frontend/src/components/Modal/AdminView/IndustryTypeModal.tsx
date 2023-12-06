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
import { IndustryType } from "../../../data/industryType";

type IndustryTypeModalProps = IndustryType & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<IndustryType>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const IndustryTypeAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...industryTypeData
}: IndustryTypeModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addIndustryTypeUrl = "https://localhost:44373/api/AddIndustryType";
    const industryType = {
      Industry_Name: industryTypeData.Industry_Name,
      Encoded_By: 24287,
    };

    axios
      .post(addIndustryTypeUrl, industryType, config)
      .then(() => {
        toast({
          description: `Industry Type "${industryTypeData.Industry_Name}" has been added.`,
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
          description: `Failed to add Industry Type "${industryTypeData.Industry_Name}". Please try again.`,
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
        <ModalHeader>Add Industry Type</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="industry-name" isRequired label="Title">
              <Input
                id="industry-name"
                name="industry-name"
                onChange={(e) =>
                  updateFields?.({ Industry_Name: e.target.value })
                }
                placeholder="Title"
                type="text"
                value={industryTypeData.Industry_Name}
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

export const IndustryTypeUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...industryTypeData
}: IndustryTypeModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateIndustryTypeUrl =
      "https://localhost:44373/api/UpdateIndustryType";
    const industryType = {
      IndustryTypeId: industryTypeData.IndustryTypeId,
      Industry_Name: industryTypeData.Industry_Name,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateIndustryTypeUrl, industryType, config)
      .then(() => {
        toast({
          description: `Industry Type "${industryTypeData.Industry_Name}" has been updated.`,
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
          description: `Failed to update industryType "${industryTypeData.Industry_Name}". Please try again.`,
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
        <ModalHeader>Update Industry Type</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="industry-name" isRequired label="Title">
              <Input
                id="industry-name"
                name="industry-name"
                onChange={(e) =>
                  updateFields?.({ Industry_Name: e.target.value })
                }
                placeholder="Title"
                type="text"
                value={industryTypeData.Industry_Name}
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

export const IndustryTypeDelete = ({
  isOpen,
  onClose,
  ...industryTypeData
}: IndustryTypeModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteIndustryTypeUrl =
      "https://localhost:44373/api/RemoveIndustryType";
    const industryType = {
      IndustryTypeId: industryTypeData.IndustryTypeId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteIndustryTypeUrl, industryType, config)
      .then(() => {
        toast({
          description: `Industry Type "${industryTypeData.Industry_Name} has been deleted."`,
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
          description: `Failed to delete IndustryType "${industryTypeData.Industry_Name}". Please try again.`,
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
        <ModalHeader>Delete IndustryType</ModalHeader>
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
              {industryTypeData.Industry_Name}
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
