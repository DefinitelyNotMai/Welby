import {
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import CustomButton from "../CustomButton";
import CustomText from "../CustomText";
import { CustomTextbox } from "../Form/CustomInput";

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

type ModalAddEmployeeProps = EmployeeFormData & {
  isOpen: boolean;
  onClose: () => void;
  updateFields: (fields: Partial<EmployeeFormData>) => void;
};

const AddEmployee = ({
  Email,
  Password,
  Role,
  isOpen,
  onClose,
  updateFields,
}: ModalAddEmployeeProps) => {
  const [addEmployeeData, setAddEmployeeData] = useState(EMPLOYEE_DATA);
  const { userId } = useUserContext();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const updateAddEmployeeFields = (fields: Partial<EmployeeFormData>) => {
    setAddEmployeeData((prev) => {
      return { ...prev };
    });
  };

  const handleSubmit = async () => {
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
                //alert("Success! Log in to access your dashboard.")
                console.log("Successfully added to OWS");
                return response.data;
                //navigate('/')
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontFamily="Montserrat" fontWeight="700" fontSize="24">
            Add Employee
          </Text>
        </ModalHeader>
        <ModalBody minWidth="35%">
          <Grid templateColumns="1fr 2fr" mb="8" gap={8}>
            <VStack justifyContent="center" alignItems="flex-end" gap={2}>
              <CustomText color="placeholder.text">Email:</CustomText>
              <CustomText color="placeholder.text">
                Temporary Password:
              </CustomText>
              <CustomText color="placeholder.text">Role:</CustomText>
            </VStack>
            <VStack>
              <CustomTextbox
                autoComplete="email"
                id="employee-email"
                name="employee-email"
                placeholder="Email"
                onChange={(e) => updateFields({ Email: e.target.value })}
                type="email"
                value={Email}
              />
              <CustomTextbox
                autoComplete="new-password"
                id="employee-password"
                name="employee-password"
                placeholder="Temporary member password"
                onChange={(e) => updateFields({ Password: e.target.value })}
                type="password"
                value={Password}
              />
              <CustomTextbox
                autoComplete="off"
                id="employee-role"
                name="employee-role"
                placeholder="Team Leader || Team Member"
                onChange={(e) => updateFields({ Role: e.target.value })}
                type="text"
                value={Role}
              />
            </VStack>
          </Grid>
          <Flex flexDirection="row-reverse" gap="4" mb="4">
            <CustomButton width={["25%"]} onClick={handleSubmit} type="button">
              <CustomText fontWeight="medium">Add</CustomText>
            </CustomButton>
            <CustomButton
              backgroundColor="#bcbcbc"
              width={["25%"]}
              onClick={onClose}
              type="button"
            >
              <CustomText fontWeight="medium">Cancel</CustomText>
            </CustomButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddEmployee;
