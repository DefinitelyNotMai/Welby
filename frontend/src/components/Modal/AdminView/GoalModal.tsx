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
import { Goal } from "../../../data/goal";
import { FormEvent } from "react";
import { FormItem } from "../../Form/FormItem";
import { SelectCompany } from "../../Form/Select";

type GoalModalProps = Goal & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Goal>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const GoalAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...goalData
}: GoalModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addGoalUrl = "https://localhost:44373/api/AddGoal";
    const goal = {
      CompanyId: goalData.CompanyId,
      Title: goalData.Title,
      Description: goalData.Description,
      DurationTo: goalData.DurationTo,
      Encoded_By: 24287,
    };

    axios
      .post(addGoalUrl, goal, config)
      .then(() => {
        toast({
          description: `Goal "${goalData.Title}" has been added for Company "${goalData.CompanyId}".`,
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
          description: `Failed to add Goal "${goalData.Title}". Please try again.`,
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
        <ModalHeader>Add Goal</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="goal-company" isRequired label="Company">
              <SelectCompany
                id="goal-company"
                name="goal-company"
                onChange={(e) =>
                  updateFields?.({ CompanyId: parseInt(e.target.value) })
                }
                value={goalData.CompanyId}
              />
            </FormItem>
            <FormItem htmlFor="goal-title" isRequired label="Title">
              <Input
                id="goal-title"
                name="goal-title"
                onChange={(e) => updateFields?.({ Title: e.target.value })}
                placeholder="Title"
                type="text"
                value={goalData.Title}
              />
            </FormItem>
            <FormItem htmlFor="goal-description" isRequired label="Description">
              <Textarea
                id="goal-description"
                name="goal-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                placeholder="Description"
                value={goalData.Description}
              />
            </FormItem>
            <FormItem htmlFor="goal-durationTo" isRequired label="Duration To">
              <Input
                id="goal-durationTo"
                name="goal-durationTo"
                onChange={(e) => updateFields?.({ DurationTo: e.target.value })}
                type="date"
                value={goalData.DurationTo}
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

export const GoalUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...goalData
}: GoalModalProps) => {
  const toast = useToast();

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateGoalUrl = "https://localhost:44373/api/UpdateGoal";
    const goal = {
      GoalId: goalData.GoalId,
      CompanyId: goalData.CompanyId,
      Title: goalData.Title,
      Description: goalData.Description,
      DurationTo: goalData.DurationTo,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateGoalUrl, goal, config)
      .then(() => {
        toast({
          description: `Goal "${goalData.Title}" has been updated.`,
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
          description: `Failed to update goal "${goalData.Title}". Please try again.`,
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
        <ModalHeader>Update Goal</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="goal-company" isRequired label="Company">
              <SelectCompany
                id="goal-company"
                name="goal-company"
                onChange={(e) =>
                  updateFields?.({ CompanyId: parseInt(e.target.value) })
                }
                value={goalData.CompanyId}
              />
            </FormItem>
            <FormItem htmlFor="goal-title" isRequired label="Title">
              <Input
                id="goal-title"
                name="goal-title"
                onChange={(e) => updateFields?.({ Title: e.target.value })}
                placeholder="Title"
                type="text"
                value={goalData.Title}
              />
            </FormItem>
            <FormItem htmlFor="goal-description" isRequired label="Description">
              <Textarea
                id="goal-description"
                name="goal-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                placeholder="Description"
                value={goalData.Description}
              />
            </FormItem>
            <FormItem htmlFor="goal-durationTo" isRequired label="Duration To">
              <Input
                id="goal-durationTo"
                name="goal-durationTo"
                onChange={(e) => updateFields?.({ DurationTo: e.target.value })}
                type="date"
                value={formatDate(goalData.DurationTo)}
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

export const GoalDelete = ({
  isOpen,
  onClose,
  ...goalData
}: GoalModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteGoalUrl = "https://localhost:44373/api/RemoveGoal";
    const goal = {
      GoalId: goalData.GoalId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteGoalUrl, goal, config)
      .then(() => {
        toast({
          description: `Goal "${goalData.Title} has been deleted."`,
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
          description: `Failed to delete Goal "${goalData.Title}". Please try again.`,
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
        <ModalHeader>Delete Goal</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleDelete}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={8}
            justifyContent="center"
          >
            <Text color="#ffffff" fontSize="1.25rem">
              Are you sure you want to delete &quot;{goalData.Title}&quot;?
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
