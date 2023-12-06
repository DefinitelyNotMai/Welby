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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

// local
import { FormEvent } from "react";
import { FormItem } from "../../Form/FormItem";
import { Value } from "../../../data/value";
import { SelectCompany } from "../../Form/Select";

type ValueModalProps = Value & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Value>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ValueAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...valueData
}: ValueModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addValueUrl = "https://localhost:44373/api/AddValue";
    const value = {
      CompanyId: valueData.CompanyId,
      Title: valueData.Title,
      Description: valueData.Description,
      Encoded_By: 24287,
    };

    axios
      .post(addValueUrl, value, config)
      .then(() => {
        toast({
          description: `Value "${valueData.Title}" has been added.`,
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
          description: `Failed to add Value "${valueData.Title}". Please try again.`,
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
        <ModalHeader>Add Value</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="value-company" isRequired label="Company">
              <SelectCompany
                id="value-company"
                name="value-company"
                onChange={(e) =>
                  updateFields?.({ CompanyId: parseInt(e.target.value) })
                }
                value={valueData.CompanyId}
              />
            </FormItem>
            <FormItem htmlFor="value-title" isRequired label="Title">
              <Input
                id="value-title"
                name="value-title"
                onChange={(e) => updateFields?.({ Title: e.target.value })}
                placeholder="Title"
                type="text"
                value={valueData.Title}
              />
            </FormItem>
            <FormItem
              htmlFor="value-description"
              isRequired
              label="Description"
            >
              <Textarea
                id="value-description"
                name="value-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                placeholder="Description"
                value={valueData.Description}
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

export const ValueUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...valueData
}: ValueModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateValueUrl = "https://localhost:44373/api/UpdateValue";
    const value = {
      ValueId: valueData.ValueId,
      CompanyId: valueData.CompanyId,
      Title: valueData.Title,
      Description: valueData.Description,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateValueUrl, value, config)
      .then(() => {
        toast({
          description: `Value "${valueData.Title}" has been updated.`,
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
          description: `Failed to update value "${valueData.Title}". Please try again.`,
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
        <ModalHeader>Update Value</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="value-company" isRequired label="Company">
              <SelectCompany
                id="value-company"
                name="value-company"
                onChange={(e) =>
                  updateFields?.({ CompanyId: parseInt(e.target.value) })
                }
                value={valueData.CompanyId}
              />
            </FormItem>
            <FormItem htmlFor="value-title" isRequired label="Title">
              <Input
                id="value-title"
                name="value-title"
                onChange={(e) => updateFields?.({ Title: e.target.value })}
                placeholder="Title"
                type="text"
                value={valueData.Title}
              />
            </FormItem>
            <FormItem
              htmlFor="value-description"
              isRequired
              label="Description"
            >
              <Textarea
                id="value-description"
                name="value-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                placeholder="Description"
                value={valueData.Description}
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

export const ValueDelete = ({
  isOpen,
  onClose,
  ...valueData
}: ValueModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteValueUrl = "https://localhost:44373/api/RemoveValue";
    const value = {
      ValueId: valueData.ValueId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteValueUrl, value, config)
      .then(() => {
        toast({
          description: `Value "${valueData.Title} has been deleted."`,
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
          description: `Failed to delete Value "${valueData.Title}". Please try again.`,
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
        <ModalHeader>Delete Value</ModalHeader>
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
              {valueData.Title}
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
