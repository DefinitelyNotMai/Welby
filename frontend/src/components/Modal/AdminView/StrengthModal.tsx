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
import { Strength } from "../../../data/strength";
import { SelectStrengthCategory } from "../../Form/Select";

type StrengthModalProps = Strength & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Strength>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const StrengthAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...strengthData
}: StrengthModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addStrengthUrl = "https://localhost:44373/api/AddStrength";
    const strength = {
      Strength: strengthData.Strength,
      Category: strengthData.Category,
      Description: strengthData.Description,
      Encoded_By: 24287,
    };

    axios
      .post(addStrengthUrl, strength, config)
      .then(() => {
        toast({
          description: `Strength "${strengthData.Strength}" has been added.`,
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
          description: `Failed to add Strength "${strengthData.Strength}". Please try again.`,
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
        <ModalHeader>Add Strength</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="strength" isRequired label="Strength">
              <Input
                id="strength"
                name="strength"
                onChange={(e) => updateFields?.({ Strength: e.target.value })}
                placeholder="Strength"
                type="text"
                value={strengthData.Strength}
              />
            </FormItem>
            <FormItem htmlFor="strength-category" isRequired label="Category">
              <SelectStrengthCategory
                id="strength-category"
                name="strength-category"
                onChange={(e) => updateFields?.({ Category: e.target.value })}
                value={strengthData.Category}
              />
            </FormItem>
            <FormItem
              htmlFor="strength-description"
              isRequired
              label="Description"
            >
              <Textarea
                id="strength-description"
                name="strength-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                placeholder="Description"
                value={strengthData.Description}
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

export const StrengthUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...strengthData
}: StrengthModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateStrengthUrl = "https://localhost:44373/api/UpdateStrength";
    const strength = {
      StrengthId: strengthData.StrengthId,
      Strength: strengthData.Strength,
      Category: strengthData.Category,
      Description: strengthData.Description,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateStrengthUrl, strength, config)
      .then(() => {
        toast({
          description: `Strength "${strengthData.Strength}" has been updated.`,
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
          description: `Failed to update strength "${strengthData.Strength}". Please try again.`,
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
        <ModalHeader>Update Strength</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="strength" isRequired label="Strength">
              <Input
                id="strength"
                name="strength"
                onChange={(e) => updateFields?.({ Strength: e.target.value })}
                placeholder="Strength"
                type="text"
                value={strengthData.Strength}
              />
            </FormItem>
            <FormItem htmlFor="strength-category" isRequired label="Category">
              <SelectStrengthCategory
                id="strength-category"
                name="strength-category"
                onChange={(e) => updateFields?.({ Category: e.target.value })}
                value={strengthData.Category}
              />
            </FormItem>
            <FormItem
              htmlFor="strength-description"
              isRequired
              label="Description"
            >
              <Textarea
                id="strength-description"
                name="strength-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                placeholder="Description"
                value={strengthData.Description}
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

export const StrengthDelete = ({
  isOpen,
  onClose,
  ...strengthData
}: StrengthModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteStrengthUrl = "https://localhost:44373/api/RemoveStrength";
    const strength = {
      StrengthId: strengthData.StrengthId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteStrengthUrl, strength, config)
      .then(() => {
        toast({
          description: `Strength "${strengthData.Strength} has been deleted."`,
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
          description: `Failed to delete Strength "${strengthData.Strength}". Please try again.`,
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
        <ModalHeader>Delete Strength</ModalHeader>
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
              {strengthData.Strength}
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
