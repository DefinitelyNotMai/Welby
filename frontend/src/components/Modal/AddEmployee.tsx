import {
  Button,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { FormEvent, useState } from "react";
import { SelectRole } from "../Form/Select";
import axios from "axios";
import bcrypt from "bcryptjs";

type EmployeeFormData = {
  Email: string;
  Password: string;
  Role: string;
};

const EMPLOYEE_DATA: EmployeeFormData = {
  Email: "",
  Password: "",
  Role: "",
};

type AddEmployeeProps = EmployeeFormData & {
  isOpen: boolean;
  onClose: () => void;
};

export const AddEmployee = ({
  Email,
  Password,
  Role,
  isOpen,
  onClose,
}: AddEmployeeProps) => {
  const [addEmployeeData, setAddEmployeeData] = useState(EMPLOYEE_DATA);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddEmployee();
  };

  const updateAddEmployeeFields = (fields: Partial<EmployeeFormData>) => {
    setAddEmployeeData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const userId = localStorage.getItem("userId");

  const handleAddEmployee = async () => {
    const temporaryData = {
      Email: addEmployeeData.Email,
      //"CompanyId": use,
      CompanyPosition: addEmployeeData.Role,
      FirstLogIn: 1,
      Encoded_By: userId,
    };

    try {
      const addEmployeeUrl = "https://localhost:44373/api/AddEmployee";
      const addEmployee = await axios
        .post(addEmployeeUrl, temporaryData, config)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      if (addEmployee != null) {
        const getEmployeeUrl = "https://localhost:44373/api/GetEmployee";
        const param = {
          Email: addEmployeeData.Email,
        };
        const employee = await axios
          .get(getEmployeeUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            params: param,
          })
          .then((response) => {
            const result = response.data;
            if (result != null) {
              if (result.length > 0) {
                console.log(result);
                console.log("added to welby");
                //setting company admin id
                return result[0];
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        if (employee != null) {
          const tokenUrl = "http://localhost:58258/token";
          const header = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          };
          const adminUserName = "Venancio";
          const adminUserPassword = "Jones";
          const formData = new URLSearchParams();
          formData.append("grant_type", "password");
          formData.append("username", adminUserName);
          formData.append("password", adminUserPassword);
          const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: header,
            body: formData,
          })
            .then((res) => {
              return res.json();
            })
            .catch(function (error) {
              console.log(error);
            });
          if (tokenResponse != null) {
            const token = tokenResponse.access_token;
            const addToOWSUrl = "http://localhost:58258/api/AddSystemUsers";
            const hashedPassword = await bcrypt.hash(
              addEmployeeData.Password,
              10,
            );
            const user = {
              UserCode: employee.EmployeeId,
              UserName: addEmployeeData.Email,
              Password: hashedPassword,
              AccountLocked: 0,
              LoggedIn: 0,
              PasswordNoExpiry: null,
              ExpiryDays: null,
              AccountVerified: null,
              VerifiedDate: null,
              Encoded_By: userId,
              Active: true,
            };
            const addToOWS = await axios
              .post(addToOWSUrl, user, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                console.log(response.data);
                console.log("Successfully added to OWS");
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
            if (addToOWS != null) {
              const tokenUrl = "http://localhost:58258/token";
              const header = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
              };
              const adminUserName = "Venancio";
              const adminUserPassword = "Jones";
              const formData = new URLSearchParams();
              formData.append("grant_type", "password");
              formData.append("username", adminUserName);
              formData.append("password", adminUserPassword);
              const tokenResponse = await fetch(tokenUrl, {
                method: "POST",
                headers: header,
                body: formData,
              })
                .then((res) => {
                  return res.json();
                })
                .catch(function (error) {
                  console.log(error);
                });
              if (tokenResponse != null) {
                const token = tokenResponse.access_token;
                const mapCompanyAdminrUrl =
                  "http://localhost:58258/api/MapSystemUsersToSecurityGroupMapping";
                const mapAdmin = {
                  SecurityGroupId: 6,
                  UserId: addToOWS.UserId,
                  Encoded_By: userId,
                };
                axios
                  .post(mapCompanyAdminrUrl, mapAdmin, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                    alert("Success! Added member to your team!");
                    console.log("Mapped Admin");
                    return response.data;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
          }
        }
      }
    } catch (error) {
      // Handle network or other error
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="#ffffff" minWidth="35%">
        <ModalHeader color="#000000">Add Employee</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Grid gap={8} templateColumns="1fr 2fr" width="full">
              <Flex
                alignItems="flex-end"
                flexDirection="column"
                gap={7}
                marginTop={2}
              >
                <Text color="#6b6b6b">Email:</Text>
                <Text color="#6b6b6b">Password:</Text>
                <Text color="#6b6b6b">Role:</Text>
              </Flex>
              <Flex alignItems="flex-start" flexDirection="column" gap={2}>
                <Input
                  border="2px solid #f6f6f6"
                  id="employee-email"
                  name="employee-email"
                  placeholder="Email"
                  onChange={(e) =>
                    updateAddEmployeeFields({ Email: e.target.value })
                  }
                  type="email"
                  value={Email}
                />
                <Input
                  border="2px solid #f6f6f6"
                  id="employee-password"
                  name="employee-password"
                  placeholder="Password"
                  onChange={(e) =>
                    updateAddEmployeeFields({ Password: e.target.value })
                  }
                  type="password"
                  value={Password}
                />
                <SelectRole
                  id="employee-role"
                  name="employee-role"
                  onChange={(e) =>
                    updateAddEmployeeFields({ Role: e.target.value })
                  }
                  value={Role}
                />
              </Flex>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Flex justifyContent="space-between" width="full">
              <Button
                backgroundColor="#bcbcbc"
                color="#ffffff"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};