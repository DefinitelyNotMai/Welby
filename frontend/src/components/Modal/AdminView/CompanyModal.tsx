/*
const CompanyUpdate = ({
  Logo,
  Name,
  Email,
  Phone_Number,
  Website,
  Vision,
  Mission,
  CountryId,
  IndustryTypeId,
  FoundingDate,
  handleAddUpdate,
  handleCancel,
  isOpen,
  onClose,
  updateFields,
}: CompanyAddUpdateProps) => {
  return (
    <AdminViewModal header="Update Company" isOpen={isOpen} onClose={onClose}>
      <Flex flexDirection="column" gap={4}>
        <FormItem htmlFor="company-logo">
          <UploadPhoto
            id="company-logo"
            name="company-logo"
            label="Company Logo"
            onChange={(e) => updateFields({ Logo: e })}
            value={Logo}
            buttonWidth={["50%", "25%"]}
          />
        </FormItem>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <Flex flexDirection="column" gap={4}>
            <FormItem htmlFor="company-email" label="Email">
              <Input
                id="company-email"
                name="company-email"
                onChange={(e) => updateFields({ Email: e.target.value })}
                placeholder="Email"
                type="email"
                value={Email}
              />
            </FormItem>
            <FormItem htmlFor="company-website" label="Website">
              <Input
                id="company-website"
                name="company-website"
                onChange={(e) => updateFields({ Website: e.target.value })}
                placeholder="Website"
                type="text"
                value={Website}
              />
            </FormItem>
            <FormItem htmlFor="company-vision" label="Vision">
              <Textarea
                id="company-vision"
                height="1rem"
                name="company-vision"
                onChange={(e) => updateFields({ Vision: e.target.value })}
                placeholder="Vision"
                value={Vision}
              />
            </FormItem>
            <FormItem htmlFor="company-country" label="Country">
              <SelectCountry
                id="company-country"
                name="company-country"
                onChange={(e) =>
                  updateFields({ CountryId: parseInt(e.target.value) })
                }
                value={CountryId}
              />
            </FormItem>
          </Flex>
          <Flex flexDirection="column" gap={4}>
            <FormItem htmlFor="company-name" label="Name">
              <Input
                id="company-name"
                name="company-name"
                onChange={(e) => updateFields({ Name: e.target.value })}
                placeholder="Name"
                type="text"
                value={Name}
              />
            </FormItem>
            <FormItem htmlFor="company-phone-number" label="Phone Number">
              <Input
                id="company-phone-number"
                name="company-phone-number"
                onChange={(e) => updateFields({ Phone_Number: e.target.value })}
                placeholder="09123456789"
                type="text"
                value={Phone_Number}
              />
            </FormItem>
            <FormItem htmlFor="company-mission" label="Mission">
              <Textarea
                id="company-mission"
                height="1rem"
                name="company-mission"
                onChange={(e) => updateFields({ Mission: e.target.value })}
                placeholder="Mission"
                value={Mission}
              />
            </FormItem>
            <FormItem htmlFor="company-industry" label="Industry Type">
              <SelectIndustryType
                id="company-industry"
                name="company-industry"
                onChange={(e) =>
                  updateFields({ IndustryTypeId: parseInt(e.target.value) })
                }
                value={IndustryTypeId}
              />
            </FormItem>
          </Flex>
        </Grid>
        <FormItem htmlFor="company-founding-date" label="Founding Date">
          <Input
            id="company-founding-date"
            name="company-founding-date"
            onChange={(e) => updateFields({ FoundingDate: e.target.value })}
            placeholder="yyyy-mm-dd"
            type="date"
            value={FoundingDate}
          />
        </FormItem>
        <Flex flexDirection="row" gap={8}>
          <Button variant="submit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUpdate}>
            Update
          </Button>
        </Flex>
      </Flex>
    </AdminViewModal>
  );
};
*/
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
import { Company } from "../../../data/company";

type CompanyModalProps = Company & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Company>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CompanyAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...companyData
}: CompanyModalProps) => {
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addCompanyUrl = "https://localhost:44373/api/AddCompany";
    const company = {
      Company: companyData.Company,
      Biological: true,
      Encoded_By: 24287,
    };

    axios
      .post(addCompanyUrl, company, config)
      .then(() => {
        toast({
          description: `Company "${companyData.Company}" has been added.`,
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
          description: `Failed to add Company "${companyData.Company}". Please try again.`,
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
        <ModalHeader>Add Company</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="company" isRequired label="Title">
              <Input
                id="company"
                name="company"
                onChange={(e) => updateFields?.({ Company: e.target.value })}
                placeholder="Title"
                type="text"
                value={companyData.Company}
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

export const CompanyUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...companyData
}: CompanyModalProps) => {
  const toast = useToast();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const updateCompanyUrl = "https://localhost:44373/api/UpdateCompany";
    const company = {
      CompanyId: companyData.CompanyId,
      Logo: companyData.Logo,
      Name: companyData.Name,
      Email: companyData.Email,
      Phone_Number: companyData.Phone_Number,
      Website: companyData.Website,
      FoundingDate: companyData.FoundingDate,
      Address: companyData.Address,
      CountryId: companyData.CountryId,
      IndustryTypeId: companyData.IndustryTypeId,
      Active: true,
      Encoded_By: 24287,
    };

    axios
      .patch(updateCompanyUrl, company, config)
      .then(() => {
        toast({
          description: `Company "${companyData.Company}" has been updated.`,
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
          description: `Failed to update company "${companyData.Company}". Please try again.`,
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
        <ModalHeader>Update Company</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={4}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="company" isRequired label="Title">
              <Input
                id="company"
                name="company"
                onChange={(e) => updateFields?.({ Company: e.target.value })}
                placeholder="Title"
                type="text"
                value={companyData.Company}
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

export const CompanyDelete = ({
  isOpen,
  onClose,
  ...companyData
}: CompanyModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteCompanyUrl = "https://localhost:44373/api/RemoveCompany";
    const company = {
      CompanyId: companyData.CompanyId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteCompanyUrl, company, config)
      .then(() => {
        toast({
          description: `Company "${companyData.Name}" has been deleted.`,
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
          description: `Failed to delete Company "${companyData.Name}". Please try again.`,
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
        <ModalHeader>Delete Company</ModalHeader>
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
              {companyData.Name}
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
