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
import { FormEvent, useContext } from "react";

// local
import { Goal } from "../../../data/goal";
import { UserContext } from "../../../context/UserContext";
import { FormItem } from "../../Form/FormItem";

type GoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Goal>) => void;
  goalData: Goal;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const AddGoal = ({
  isOpen,
  onClose,
  updateFields,
  goalData,
}: GoalModalProps) => {
  const toast = useToast();

  const userContext = useContext(UserContext);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addGoalUrl = "https://localhost:44373/api/AddGoal";
    const goal = {
      CompanyId: userContext.companyId,
      Title: goalData.Title,
      Description: goalData.Description,
      DurationTo: goalData.DurationTo,
      Encoded_By: 24287,
    };

    axios
      .post(addGoalUrl, goal, config)
      .then(() => {
        toast({
          description: `Goal "${goalData.Title}" successfully added.`,
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

export const EditGoal = ({
  isOpen,
  onClose,
  goalData,
  updateFields,
}: GoalModalProps) => {
  const toast = useToast();
  const userContext = useContext(UserContext);

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const updateGoalUrl = "https://localhost:44373/api/UpdateGoal";

  const handleEditGoal = async () => {
    try {
      const goal = {
        GoalId: goalData.GoalId,
        CompanyId: userContext.companyId,
        Title: goalData.Title,
        Description: goalData.Description,
        DurationTo: goalData.DurationTo,
        Active: true,
        Encoded_By: localStorage.getItem("userId"),
      };

      axios
        .patch(updateGoalUrl, goal, config)
        .then(() => {
          toast({
            title: "SUCCESS",
            description: "Successfully updated company Goal.",
            position: "top",
            status: "success",
            isClosable: true,
            duration: 5000,
          });
          onClose();
        })
        .catch((error) => {
          console.error("An error has occured: ", error);
          toast({
            title: "ERROR",
            description: "Failed to update company Goal. Please try again.",
            position: "top",
            status: "error",
            isClosable: true,
            duration: 5000,
          });
        });
    } catch (error) {
      console.error("Error updating goal: ", error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleEditGoal();
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
        <ModalHeader>Edit Goal</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleSubmit}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            margin={8}
          >
            <FormItem htmlFor="goal-title" label="Title" isRequired>
              <Input
                id="goal-title"
                name="goal-title"
                onChange={(e) => updateFields?.({ Title: e.target.value })}
                value={goalData.Title}
              />
            </FormItem>
            <FormItem htmlFor="goal-description" label="Description" isRequired>
              <Textarea
                id="goal-description"
                name="goal-description"
                onChange={(e) =>
                  updateFields?.({ Description: e.target.value })
                }
                value={goalData.Description}
              />
            </FormItem>
            <FormItem htmlFor="goal-durationTo" label="Duration To" isRequired>
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

export const DeleteGoal = ({ isOpen, onClose, goalData }: GoalModalProps) => {
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
            <Text color="#ffffff" fontSize="1rem">
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
