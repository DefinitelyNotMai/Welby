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
import { Country } from "../../../data/country";
import { UploadPhoto } from "../../Form/UploadPhoto";

type CountryModalProps = Country & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Country>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CountryAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...countryData
}: CountryModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addCountryUrl = "https://localhost:44373/api/AddCountry";
    const country = {
      Name: countryData.Name,
      Nationality: countryData.Nationality,
      Flag_Image: countryData.Flag_Image,
      Encoded_By: localStorage.getItem("userId"),
    };

    axios
      .post(addCountryUrl, country, config)
      .then(() => {
        toast({
          description: `Country "${countryData.Name}" has been added.`,
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
          description: `Failed to add Country "${countryData.Name}". Please try again.`,
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
        <ModalHeader>Add Country</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={4}
          >
            <FormItem htmlFor="country-flag-image">
              <UploadPhoto
                buttonWidth={["50%", "25%"]}
                id="country-flag-image"
                name="country-flag-image"
                label="Profile Photo"
                onChange={(e) => updateFields?.({ Flag_Image: e })}
                value={countryData.Flag_Image}
              />
            </FormItem>
            <FormItem htmlFor="country-title" isRequired label="Name">
              <Input
                id="country-title"
                name="country-title"
                onChange={(e) => updateFields?.({ Name: e.target.value })}
                placeholder="Name"
                type="text"
                value={countryData.Name}
              />
            </FormItem>
            <FormItem
              htmlFor="country-nationality"
              isRequired
              label="Nationality"
            >
              <Input
                id="country-nationality"
                name="country-nationality"
                onChange={(e) =>
                  updateFields?.({ Nationality: e.target.value })
                }
                placeholder="Nationality"
                type="text"
                value={countryData.Nationality}
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

export const CountryUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...countryData
}: CountryModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateCountryUrl = "https://localhost:44373/api/UpdateCountry";
    const country = {
      CountryId: countryData.CountryId,
      Name: countryData.Name,
      Nationality: countryData.Nationality,
      Flag_Image: countryData.Flag_Image,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateCountryUrl, country, config)
      .then(() => {
        toast({
          description: `Country "${countryData.Name}" has been updated.`,
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
          description: `Failed to update Country "${countryData.Name}". Please try again.`,
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
        <ModalHeader>Update Country</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={4}
          >
            <FormItem htmlFor="country-flag-image">
              <UploadPhoto
                buttonWidth={["50%", "25%"]}
                id="country-flag-image"
                name="country-flag-image"
                label="Profile Photo"
                onChange={(e) => updateFields?.({ Flag_Image: e })}
                value={countryData.Flag_Image}
              />
            </FormItem>
            <FormItem htmlFor="country-title" isRequired label="Name">
              <Input
                id="country-title"
                name="country-title"
                onChange={(e) => updateFields?.({ Name: e.target.value })}
                placeholder="Name"
                type="text"
                value={countryData.Name}
              />
            </FormItem>
            <FormItem
              htmlFor="country-nationality"
              isRequired
              label="Nationality"
            >
              <Input
                id="country-nationality"
                name="country-nationality"
                onChange={(e) =>
                  updateFields?.({ Nationality: e.target.value })
                }
                placeholder="Nationality"
                type="text"
                value={countryData.Nationality}
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

export const CountryDelete = ({
  isOpen,
  onClose,
  ...countryData
}: CountryModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteCountryUrl = "https://localhost:44373/api/RemoveCountry";
    const country = {
      CountryId: countryData.CountryId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteCountryUrl, country, config)
      .then(() => {
        toast({
          description: `Country "${countryData.Name} has been deleted."`,
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
          description: `Failed to delete Country "${countryData.Name}". Please try again.`,
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
        <ModalHeader>Delete Country</ModalHeader>
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
              {countryData.Name}
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
