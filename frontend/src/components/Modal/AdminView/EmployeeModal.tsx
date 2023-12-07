// lib
import axios from "axios";
import bcrypt from "bcryptjs";
import {
  Button,
  Flex,
  Grid,
  GridItem,
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
import { Employee } from "../../../data/employee";
import { FormEvent, useState } from "react";
import { FormItem } from "../../Form/FormItem";
import {
  SelectCompany,
  SelectCountry,
  SelectGender,
  SelectRole,
} from "../../Form/Select";
import { UploadPhoto } from "../../Form/UploadPhoto";
import { fetchAccessToken } from "../../../api/tokenService";

type EmployeeModalProps = Employee & {
  isOpen: boolean;
  onClose: () => void;
  updateFields?: (fields: Partial<Employee>) => void;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const EmployeeAdd = ({
  isOpen,
  onClose,
  updateFields,
  ...employeeData
}: EmployeeModalProps) => {
  const [password, setPassword] = useState<string>("");
  const toast = useToast();

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const addEmployeeUrl = "https://localhost:44373/api/AddEmployee";
    const employee = {
      ProfilePhoto: employeeData.ProfilePhoto,
      First_Name: employeeData.First_Name,
      Middle_Name: employeeData.Middle_Name,
      Last_Name: employeeData.Last_Name,
      Nickname: employeeData.Nickname,
      Email: employeeData.Email,
      Phone_Number: employeeData.Phone_Number,
      Address: employeeData.Address,
      Birthday: employeeData.Birthday,
      CompanyId: employeeData.CompanyId,
      CompanyPosition: employeeData.CompanyPosition,
      CompanyRole: employeeData.CompanyRole,
      CountryId: employeeData.CountryId,
      GenderId: employeeData.GenderId,
      TikTok: employeeData.TikTok,
      LinkedIn: employeeData.Linkedin,
      Facebook: employeeData.Facebook,
      Instagram: employeeData.Instagram,
      Work: employeeData.Work,
      Connect: employeeData.Connect,
      Support: employeeData.Support,
      Other_Notes: employeeData.Other_Notes,
      Active: true,
      FirstLogIn: employeeData.FirstLogIn,
      Encoded_By: 24287,
    };

    const addEmployee = axios
    .post(addEmployeeUrl, employee, config)
    .then((response) => {
      return response.data
    });
    
    const getEmployeeParams = {
      Email: employeeData.Email,
      Phone_Number: employeeData.Phone_Number,
    };

    const getEmployee = axios.get(
      "https://localhost:44373/api/GetEmployees",
      {
        params: getEmployeeParams,
      },
    ).then((response) => {
      let results = response.data;
      return results[0]
    })
    const token = fetchAccessToken();
    const hashedPassword =  bcrypt.hash(password, 10);

    const userData = {
      UserCode: getEmployee.EmployeeId,
      UserName: getEmployee.Email,
      Password: hashedPassword,
      AccountLocked: 0,
      LoggedIn: 0,
      PasswordNoExpiry: null,
      ExpiryDays: null,
      AccountVerified: null,
      VerifiedDate: null,
      Encoded_By: localStorage.getItem("userId"),
      Active: true,
    };
    
    axios.post(
      "http://localhost:58258/api/AddSystemUsers",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    ).then((response) => {
      toast({
        description: `Employee "${employeeData.Nickname}" has been added.`,
        duration: 5000,
        isClosable: true,
        position: "top",
        status: "success",
        title: "SUCCESS",
      });
      onClose();
    }).catch((error) => {
      console.error("An error occurred: ", error);
      toast({
        description: `Failed to add Employee "${employeeData.Nickname}". Please try again.`,
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
        <ModalHeader>Add Employee</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleAdd}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={8}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="employee-profile-photo">
              <UploadPhoto
                buttonWidth={["50%", "25%"]}
                id="employee-profile-photo"
                name="employee-profile-photo"
                label="Profile Photo"
                onChange={(e) => updateFields?.({ ProfilePhoto: e })}
                value={employeeData.ProfilePhoto}
              />
            </FormItem>
            <Grid templateColumns="1fr 1fr" gap={4} width="full">
              <Flex flexDirection="column" gap={4}>
                <FormItem htmlFor="employee-email" isRequired label="Email">
                  <Input
                    id="employee-email"
                    name="employee-email"
                    onChange={(e) => updateFields?.({ Email: e.target.value })}
                    placeholder="Email"
                    type="email"
                    value={employeeData.Email}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-first-name"
                  isRequired
                  label="First Name"
                >
                  <Input
                    id="employee-first-name"
                    name="employee-first-name"
                    onChange={(e) =>
                      updateFields?.({ First_Name: e.target.value })
                    }
                    placeholder="First Name"
                    type="text"
                    value={employeeData.First_Name}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-middle-name"
                  isRequired
                  label="Middle Name"
                >
                  <Input
                    id="employee-middle-name"
                    name="employee-middle-name"
                    onChange={(e) =>
                      updateFields?.({ Middle_Name: e.target.value })
                    }
                    placeholder="Middle Name"
                    type="text"
                    value={employeeData.Middle_Name}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-last-name"
                  isRequired
                  label="Last Name"
                >
                  <Input
                    id="employee-last-name"
                    name="employee-last-name"
                    onChange={(e) =>
                      updateFields?.({ Last_Name: e.target.value })
                    }
                    placeholder="Last Name"
                    type="text"
                    value={employeeData.Last_Name}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-nickname"
                  isRequired
                  label="Nickname"
                >
                  <Input
                    id="employee-nickname"
                    name="employee-nickname"
                    onChange={(e) =>
                      updateFields?.({ Nickname: e.target.value })
                    }
                    placeholder="Nickname"
                    type="text"
                    value={employeeData.Nickname}
                  />
                </FormItem>
                <FormItem htmlFor="employee-gender" isRequired label="Gender">
                  <SelectGender
                    id="employee-gender"
                    name="employee-gender"
                    onChange={(e) =>
                      updateFields?.({ GenderId: parseInt(e.target.value) })
                    }
                    value={employeeData.GenderId}
                  />
                </FormItem>
                <FormItem htmlFor="employee-country" isRequired label="Country">
                  <SelectCountry
                    id="employee-country"
                    name="employee-country"
                    onChange={(e) =>
                      updateFields?.({ CountryId: parseInt(e.target.value) })
                    }
                    value={employeeData.CountryId}
                  />
                </FormItem>
                <FormItem htmlFor="employee-address" isRequired label="Address">
                  <Input
                    id="employee-address"
                    name="employee-address"
                    onChange={(e) =>
                      updateFields?.({ Address: e.target.value })
                    }
                    placeholder="Address"
                    type="text"
                    value={employeeData.Address}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-position"
                  isRequired
                  label="Position"
                >
                  <Input
                    id="employee-position"
                    name="employee-position"
                    onChange={(e) =>
                      updateFields?.({ CompanyPosition: e.target.value })
                    }
                    placeholder="Position"
                    type="text"
                    value={employeeData.CompanyPosition}
                  />
                </FormItem>
              </Flex>
              <Flex flexDirection="column" gap={4}>
                <FormItem
                  htmlFor="employee-password"
                  isRequired
                  label="Password"
                >
                  <Input
                    id="employee-password"
                    name="employee-password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    value={password}
                  />
                </FormItem>
                <FormItem htmlFor="employee-company" isRequired label="Company">
                  <SelectCompany
                    id="employee-company"
                    name="employee-company"
                    onChange={(e) =>
                      updateFields?.({ CompanyId: parseInt(e.target.value) })
                    }
                    value={employeeData.CompanyId}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-phone-number"
                  isRequired
                  label="Phone Number"
                >
                  <Input
                    id="employee-phone-number"
                    name="employee-phone-number"
                    onChange={(e) =>
                      updateFields?.({ Phone_Number: e.target.value })
                    }
                    placeholder="Phone Number"
                    type="text"
                    value={employeeData.Phone_Number}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-birthday"
                  isRequired
                  label="Birthday"
                >
                  <Input
                    id="employee-birthday"
                    name="employee-birthday"
                    onChange={(e) =>
                      updateFields?.({ Birthday: e.target.value })
                    }
                    placeholder="Birthday"
                    type="date"
                    value={employeeData.Birthday}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-facebook"
                  isRequired
                  label="Facebook"
                >
                  <Input
                    id="employee-facebook"
                    name="employee-facebook"
                    onChange={(e) =>
                      updateFields?.({ Facebook: e.target.value })
                    }
                    placeholder="Facebook"
                    type="text"
                    value={employeeData.Facebook}
                  />
                </FormItem>
                <FormItem htmlFor="employee-tiktok" isRequired label="TikTok">
                  <Input
                    id="employee-tiktok"
                    name="employee-tiktok"
                    onChange={(e) => updateFields?.({ TikTok: e.target.value })}
                    placeholder="TikTok"
                    type="text"
                    value={employeeData.TikTok}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-linkedin"
                  isRequired
                  label="LinkedIn"
                >
                  <Input
                    id="employee-linkedin"
                    name="employee-linkedin"
                    onChange={(e) =>
                      updateFields?.({ Linkedin: e.target.value })
                    }
                    placeholder="LinkedIn"
                    type="text"
                    value={employeeData.Linkedin}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-instagram"
                  isRequired
                  label="Instagram"
                >
                  <Input
                    id="employee-instagram"
                    name="employee-instagram"
                    onChange={(e) =>
                      updateFields?.({ Instagram: e.target.value })
                    }
                    placeholder="Instagram"
                    type="text"
                    value={employeeData.Instagram}
                  />
                </FormItem>
                <FormItem htmlFor="employee-role" isRequired label="Role">
                  <SelectRole
                    id="employee-role"
                    name="employee-role"
                    onChange={(e) =>
                      updateFields?.({ CompanyRole: e.target.value })
                    }
                    value={employeeData.CompanyRole}
                  />
                </FormItem>
              </Flex>
            </Grid>
            <Grid templateColumns="1fr" gap={4} width="full">
              <FormItem
                htmlFor="employee-work"
                isRequired
                label="How do I work?"
              >
                <Textarea
                  id="employee-work"
                  name="employee-work"
                  onChange={(e) => updateFields?.({ Work: e.target.value })}
                  placeholder="Type here..."
                  value={employeeData.Work}
                />
              </FormItem>
              <FormItem
                htmlFor="employee-connect"
                isRequired
                label="How do I connect and learn?"
              >
                <Textarea
                  id="employee-connect"
                  name="employee-connect"
                  onChange={(e) => updateFields?.({ Connect: e.target.value })}
                  placeholder="Type here..."
                  value={employeeData.Connect}
                />
              </FormItem>
              <FormItem
                htmlFor="employee-support"
                isRequired
                label="What I need support in?"
              >
                <Textarea
                  id="employee-support"
                  name="employee-support"
                  onChange={(e) => updateFields?.({ Support: e.target.value })}
                  placeholder="Type here..."
                  value={employeeData.Support}
                />
              </FormItem>
              <FormItem
                htmlFor="employee-other-notes"
                isRequired
                label="Other notes about yourself"
              >
                <Textarea
                  id="employee-other-notes"
                  name="employee-other-notes"
                  onChange={(e) =>
                    updateFields?.({ Other_Notes: e.target.value })
                  }
                  placeholder="Type here..."
                  value={employeeData.Other_Notes}
                />
              </FormItem>
            </Grid>
            <Flex flexDirection="row" gap={4} marginBottom={4}>
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

export const EmployeeUpdate = ({
  isOpen,
  onClose,
  updateFields,
  ...employeeData
}: EmployeeModalProps) => {
  const [password, setPassword] = useState<string>("");
  const toast = useToast();

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const updateEmployeeUrl = "https://localhost:44373/api/UpdateEmployee";
    const employee = {
      EmployeeId: employeeData.EmployeeId,
      ProfilePhoto: employeeData.ProfilePhoto,
      First_Name: employeeData.First_Name,
      Middle_Name: employeeData.Middle_Name,
      Last_Name: employeeData.Last_Name,
      Nickname: employeeData.Nickname,
      Email: employeeData.Email,
      Phone_Number: employeeData.Phone_Number,
      Address: employeeData.Address,
      Birthday: employeeData.Birthday,
      CompanyId: employeeData.CompanyId,
      CompanyPosition: employeeData.CompanyPosition,
      CompanyRole: employeeData.CompanyRole,
      CountryId: employeeData.CountryId,
      GenderId: employeeData.GenderId,
      TikTok: employeeData.TikTok,
      LinkedIn: employeeData.Linkedin,
      Facebook: employeeData.Facebook,
      Instagram: employeeData.Instagram,
      Work: employeeData.Work,
      Connect: employeeData.Connect,
      Support: employeeData.Support,
      Other_Notes: employeeData.Other_Notes,
      Active: true,
      FirstLogIn: false,
      Encoded_By: 24287,
    };

    axios
      .patch(updateEmployeeUrl, employee, config)
      .then((response) => {
       console.log(response)
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
      });

      const getEmpOwsUrl = "http://localhost:58258/api/GetSystemUsers";
      const token = await fetchAccessToken();
      const getEmpOws = axios.get(getEmpOwsUrl,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          UserId : 0,
          UserCode : employeeData.EmployeeId,
          UserName : '',
          Password : '',
          AccountLocked: 0,
          LoggedIn: 0,
          PasswordNoExpiry: null,
          ExpiryDays: null,
          AccountVerified: null,
          VerifiedDate: null,
          Encoded_By: localStorage.getItem("userId"),
          Active: true,
        }
      }).then((response) => {
        console.log(response.data);
        return response.data;
      }).catch((error) => {
        console.log(error);
      });

      const UpdateSystemUserUrl = "http://lcoalhost:58258/api/UpdateSystemUser";

      const hashedPassword = await bcrypt.hash(password, 10);

      const UpdateEmpOws = {
        UserId : getEmpOws.UserId,
        UserCode : employeeData.EmployeeId,
        UserName : employeeData.Email,
        Password : hashedPassword,
        AccountLocked: 0,
        LoggedIn: 0,
        PasswordNoExpiry: null,
        ExpiryDays: null,
        AccountVerified: null,
        VerifiedDate: null,
        Encoded_By: localStorage.getItem("userId"),
        Active: true,
      }

      axios.patch(UpdateSystemUserUrl, UpdateEmpOws, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }).then((response) =>{
        console.log(response)
        toast({
          description: `Employee "${employeeData.Nickname}" has been updated.`,
          duration: 5000,
          isClosable: true,
          position: "top",
          status: "success",
          title: "SUCCESS",
        });
        onClose();
      }).catch((error) => {
        console.error("An error occurred: ", error);
        toast({
          description: `Failed to update employee "${employeeData.Nickname}". Please try again.`,
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
        <ModalHeader>Update Employee</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleUpdate}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={8}
            justifyContent="center"
            padding={8}
          >
            <FormItem htmlFor="employee-profile-photo">
              <UploadPhoto
                buttonWidth={["50%", "25%"]}
                id="employee-profile-photo"
                name="employee-profile-photo"
                label="Profile Photo"
                onChange={(e) => updateFields?.({ ProfilePhoto: e })}
                value={employeeData.ProfilePhoto}
              />
            </FormItem>
            <Grid templateColumns="1fr 1fr" gap={4} width="full">
              <GridItem colSpan={2}></GridItem>
              <Flex flexDirection="column" gap={4}>
                <FormItem htmlFor="employee-email" isRequired label="Email">
                  <Input
                    id="employee-email"
                    name="employee-email"
                    onChange={(e) => updateFields?.({ Email: e.target.value })}
                    placeholder="Email"
                    type="email"
                    value={employeeData.Email}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-first-name"
                  isRequired
                  label="First Name"
                >
                  <Input
                    id="employee-first-name"
                    name="employee-first-name"
                    onChange={(e) =>
                      updateFields?.({ First_Name: e.target.value })
                    }
                    placeholder="First Name"
                    type="text"
                    value={employeeData.First_Name}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-middle-name"
                  isRequired
                  label="Middle Name"
                >
                  <Input
                    id="employee-middle-name"
                    name="employee-middle-name"
                    onChange={(e) =>
                      updateFields?.({ Middle_Name: e.target.value })
                    }
                    placeholder="Middle Name"
                    type="text"
                    value={employeeData.Middle_Name}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-last-name"
                  isRequired
                  label="Last Name"
                >
                  <Input
                    id="employee-last-name"
                    name="employee-last-name"
                    onChange={(e) =>
                      updateFields?.({ Last_Name: e.target.value })
                    }
                    placeholder="Last Name"
                    type="text"
                    value={employeeData.Last_Name}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-nickname"
                  isRequired
                  label="Nickname"
                >
                  <Input
                    id="employee-nickname"
                    name="employee-nickname"
                    onChange={(e) =>
                      updateFields?.({ Nickname: e.target.value })
                    }
                    placeholder="Nickname"
                    type="text"
                    value={employeeData.Nickname}
                  />
                </FormItem>
                <FormItem htmlFor="employee-gender" isRequired label="Gender">
                  <SelectGender
                    id="employee-gender"
                    name="employee-gender"
                    onChange={(e) =>
                      updateFields?.({ GenderId: parseInt(e.target.value) })
                    }
                    value={employeeData.GenderId}
                  />
                </FormItem>
                <FormItem htmlFor="employee-country" isRequired label="Country">
                  <SelectCountry
                    id="employee-country"
                    name="employee-country"
                    onChange={(e) =>
                      updateFields?.({ CountryId: parseInt(e.target.value) })
                    }
                    value={employeeData.CountryId}
                  />
                </FormItem>
                <FormItem htmlFor="employee-address" isRequired label="Address">
                  <Input
                    id="employee-address"
                    name="employee-address"
                    onChange={(e) =>
                      updateFields?.({ Address: e.target.value })
                    }
                    placeholder="Address"
                    type="text"
                    value={employeeData.Address}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-position"
                  isRequired
                  label="Position"
                >
                  <Input
                    id="employee-position"
                    name="employee-position"
                    onChange={(e) =>
                      updateFields?.({ CompanyPosition: e.target.value })
                    }
                    placeholder="Position"
                    type="text"
                    value={employeeData.CompanyPosition}
                  />
                </FormItem>
              </Flex>
              <Flex flexDirection="column" gap={4}>
                <FormItem
                  htmlFor="employee-password"
                  isRequired
                  label="Password"
                >
                  <Input
                    id="employee-password"
                    name="employee-password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    value={password}
                  />
                </FormItem>
                <FormItem htmlFor="employee-company" isRequired label="Company">
                  <SelectCompany
                    id="employee-company"
                    name="employee-company"
                    onChange={(e) =>
                      updateFields?.({ CompanyId: parseInt(e.target.value) })
                    }
                    value={employeeData.CompanyId}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-phone-number"
                  isRequired
                  label="Phone Number"
                >
                  <Input
                    id="employee-phone-number"
                    name="employee-phone-number"
                    onChange={(e) =>
                      updateFields?.({ Phone_Number: e.target.value })
                    }
                    placeholder="Phone Number"
                    type="text"
                    value={employeeData.Phone_Number}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-birthday"
                  isRequired
                  label="Birthday"
                >
                  <Input
                    id="employee-birthday"
                    name="employee-birthday"
                    onChange={(e) =>
                      updateFields?.({ Birthday: e.target.value })
                    }
                    placeholder="Birthday"
                    type="date"
                    value={formatDate(employeeData.Birthday)}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-facebook"
                  isRequired
                  label="Facebook"
                >
                  <Input
                    id="employee-facebook"
                    name="employee-facebook"
                    onChange={(e) =>
                      updateFields?.({ Facebook: e.target.value })
                    }
                    placeholder="Facebook"
                    type="text"
                    value={employeeData.Facebook}
                  />
                </FormItem>
                <FormItem htmlFor="employee-tiktok" isRequired label="TikTok">
                  <Input
                    id="employee-tiktok"
                    name="employee-tiktok"
                    onChange={(e) => updateFields?.({ TikTok: e.target.value })}
                    placeholder="TikTok"
                    type="text"
                    value={employeeData.TikTok}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-linkedin"
                  isRequired
                  label="LinkedIn"
                >
                  <Input
                    id="employee-linkedin"
                    name="employee-linkedin"
                    onChange={(e) =>
                      updateFields?.({ Linkedin: e.target.value })
                    }
                    placeholder="LinkedIn"
                    type="text"
                    value={employeeData.Linkedin}
                  />
                </FormItem>
                <FormItem
                  htmlFor="employee-instagram"
                  isRequired
                  label="Instagram"
                >
                  <Input
                    id="employee-instagram"
                    name="employee-instagram"
                    onChange={(e) =>
                      updateFields?.({ Instagram: e.target.value })
                    }
                    placeholder="Instagram"
                    type="text"
                    value={employeeData.Instagram}
                  />
                </FormItem>
                <FormItem htmlFor="employee-role" isRequired label="Role">
                  <SelectRole
                    id="employee-role"
                    name="employee-role"
                    onChange={(e) =>
                      updateFields?.({ CompanyRole: e.target.value })
                    }
                    value={employeeData.CompanyRole}
                  />
                </FormItem>
              </Flex>
            </Grid>
            <Grid templateColumns="1fr" gap={4} width="full">
              <FormItem
                htmlFor="employee-work"
                isRequired
                label="How do I work?"
              >
                <Textarea
                  id="employee-work"
                  name="employee-work"
                  onChange={(e) => updateFields?.({ Work: e.target.value })}
                  placeholder="Type here..."
                  value={employeeData.Work}
                />
              </FormItem>
              <FormItem
                htmlFor="employee-connect"
                isRequired
                label="How do I connect and learn?"
              >
                <Textarea
                  id="employee-connect"
                  name="employee-connect"
                  onChange={(e) => updateFields?.({ Connect: e.target.value })}
                  placeholder="Type here..."
                  value={employeeData.Connect}
                />
              </FormItem>
              <FormItem
                htmlFor="employee-support"
                isRequired
                label="What I need support in?"
              >
                <Textarea
                  id="employee-support"
                  name="employee-support"
                  onChange={(e) => updateFields?.({ Support: e.target.value })}
                  placeholder="Type here..."
                  value={employeeData.Support}
                />
              </FormItem>
              <FormItem
                htmlFor="employee-other-notes"
                isRequired
                label="Other notes about yourself"
              >
                <Textarea
                  id="employee-other-notes"
                  name="employee-other-notes"
                  onChange={(e) =>
                    updateFields?.({ Other_Notes: e.target.value })
                  }
                  placeholder="Type here..."
                  value={employeeData.Other_Notes}
                />
              </FormItem>
            </Grid>
            <Flex flexDirection="row" gap={4} marginBottom={4}>
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

export const EmployeeDelete = ({
  isOpen,
  onClose,
  ...employeeData
}: EmployeeModalProps) => {
  const toast = useToast();

  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    const deleteEmployeeUrl = "https://localhost:44373/api/RemoveEmployee";
    const employee = {
      EmployeeId: employeeData.EmployeeId,
      Encoded_By: 24287,
    };

    axios
      .patch(deleteEmployeeUrl, employee, config)
      .then(() => {
        toast({
          description: `Employee "${employeeData.Nickname} has been deleted."`,
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
          description: `Failed to delete employee "${employeeData.Nickname}". Please try again.`,
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
        <ModalHeader>Delete Employee</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleDelete}>
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={8}
            justifyContent="center"
          >
            <Text color="#ffffff" fontSize="1.25rem">
              Are you sure you want to delete {employeeData.Nickname}?
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
